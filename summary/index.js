import OpenAI from "openai";
import matter from "gray-matter";
import "dotenv/config";
import fs from "fs/promises";
import { getLesson, getLessons } from "../data/lesson.js";
import { zodResponseFormat } from "openai/helpers/zod";
import getPrompt from "./getSystemPrompt.js";
import assert from "assert";
import path from "path";
import { z } from "zod";

const args = process.argv.slice(2);
const force = args.includes("--force");

const configBuffer = await fs.readFile(
  path.join(process.cwd(), "./course.json")
);
const config = JSON.parse(configBuffer);

const openai = new OpenAI();

assert(
  process.env.OPENAI_API_KEY,
  "OPENAI_API_KEY must exist. Either pass it in via the environment or define it in the .env file"
);

async function exec() {
  const list = await getLessons();

  for (let section of list) {
    for (let lesson of section.lessons) {
      await summarize(section, lesson);
    }
  }
}

async function summarize(section, lesson) {
  const rendered = await getLesson(section.slug, lesson.slug);
  const file = await fs.readFile(lesson.path);
  const { data, content } = matter(file.toString());

  if (data.description && !force) {
    console.log(`⏺️ ${lesson.fullSlug}`);
  } else {
    try {
      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: getPrompt(config) },
          {
            role: "user",
            content: `The markdown content is: \n\n\n${rendered.markdown}`,
          },
        ],
        response_format: zodResponseFormat(
          z.object({
            seoDescription: z.string(),
            seoKeywords: z.array(z.string()),
          }),
          "lesson"
        ),
      });

      const parsed = {
        description: completion.choices[0].message.parsed.seoDescription,
        keywords: completion.choices[0].message.parsed.seoKeywords,
      };

      const newData = Object.assign({}, data, parsed);
      const contentToWrite = matter.stringify({ content, data: newData });

      await fs.writeFile(lesson.path, contentToWrite);
      console.log(`✅ ${lesson.fullSlug}`);
    } catch (e) {
      console.error(`❌ Error on ${lesson.path}, skipping`, e);
      process.exit(1);
    }
  }
}

exec();
