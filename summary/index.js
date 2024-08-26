import { ChatGPTAPI } from "chatgpt";
import matter from "gray-matter";
import "dotenv/config";
import fs from "fs/promises";
import { getLesson, getLessons } from "../data/lesson.js";
import getPrompt from "./getPrompt.js";
import assert from "assert";

assert(
  process.env.OPENAI_API_KEY,
  "OPENAI_API_KEY must exist. Either pass it in via the environment or define it in the .env file"
);

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  const prompt = getPrompt(rendered.markdown);
  const file = await fs.readFile(lesson.path);
  const { data, content } = matter(file.toString());

  if (data.description) {
    console.log(`⏺️ ${lesson.fullSlug}`);
  } else {
    try {
      let res = await api.sendMessage(prompt);
      const parsed = JSON.parse(res.text);

      const newData = Object.assign({}, data, parsed);
      const contentToWrite = matter.stringify({ content, data: newData });

      await fs.writeFile(lesson.path, contentToWrite);
      console.log(`✅ ${lesson.fullSlug}`);
    } catch (e) {
      console.error(`Error on ${lesson.path}, skipping`, e);
    }
  }
}

exec();
