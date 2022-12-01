import { readFile } from 'fs/promises';

const src = './1_calories/data.txt';
const text = (await readFile(src)).toString();

const result = Math.max(
  ...text
    .split('\n\n')
    .map(elf => elf.split('\n').reduce((calories, one) => calories + +one, 0))
);

console.log(result);
