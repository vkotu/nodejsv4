// import fs from "fs";

// const result = fs.readFileSync("some/path/to/file.txt");

// promise version
const fs = require("fs/promises");

const path = require('path');

const read = async () => {
    const result = await fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
    console.log(result);
}

read();
console.log('hi');