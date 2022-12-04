import { getPuzzleInput } from '../../utils.js';

const text = await getPuzzleInput(import.meta.url);

const result = Math.max(
  ...text
    .split('\n\n')
    .map(elf => elf.split('\n').reduce((calories, one) => calories + +one, 0))
);

console.log(result);
