// build script for the project

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'lib');
const distDir = path.resolve(rootDir, 'dist');

fs.rmdirSync(distDir, { recursive: true });
fs.mkdirSync(distDir);

execSync(`tsc --project ${rootDir}/tsconfig.json`);