import { readFileSync } from "fs";
import path from "path";

const buffer = readFileSync(path.join(process.cwd(), "./course.json"));
const course = JSON.parse(buffer);
const BASE_URL = course?.productionBaseUrl || "";

const config = {
  output: "export",
  basePath: BASE_URL,
  env: {
    BASE_URL,
  },
};

export default config;
