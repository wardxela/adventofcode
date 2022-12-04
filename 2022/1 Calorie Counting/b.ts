import { readFile } from 'fs/promises';

const src = './1_calories/data.txt';
const text = (await readFile(src)).toString();

const sum = (a: number, b: number) => a + b;

const result = text
  .split('\n\n')
  .map(elf =>
    elf
      .split('\n')
      .map(a => +a)
      .reduce(sum, 0)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(sum);

console.log(result);
