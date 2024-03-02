// build script for the project

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

if (fs.existsSync(distDir)) {
  fs.rmdirSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

execSync(`tsc --project ${rootDir}/tsconfig.json`);
