import { readFile } from 'fs/promises';

const data = (await readFile('./2021/1_measurements/input.txt')).toString();

let count = -1;

data
  .split('\n')
  .map(a => +a)
  .reduce((prev, current) => {
    current > prev && count++;
    return current;
  }, -1);

console.log(count);
