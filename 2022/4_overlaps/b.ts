import { readFile } from 'fs/promises';

const data = (await readFile('./2022/4_overlaps/input.txt')).toString();

const result = data
  .split('\n')
  .map(pair => pair.split(',').map(range => range.split('-').map(v => +v)))
  .filter(
    pair =>
      (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1])
  ).length;

console.log(result);