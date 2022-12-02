import { readFile } from 'fs/promises';

const data = (await readFile('./2021/1_measurements/input.txt')).toString();

let count = -1;

const sum = (a: number, b: number) => a + b;

data
  .split('\n')
  .map(a => +a)
  .reduce<number[]>((result, _, index, initial) => {
    if (index + 2 < initial.length) {
      return [...result, initial.slice(index, index + 3).reduce(sum, 0)];
    }
    return result;
  }, [])
  .reduce((prev, current) => {
    current > prev && count++;
    return current;
  }, -1);

console.log(count);
