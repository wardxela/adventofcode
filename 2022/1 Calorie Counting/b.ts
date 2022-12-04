import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const sum = (a: number, b: number) => a + b;

const result = data
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
