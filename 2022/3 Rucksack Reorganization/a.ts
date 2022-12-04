import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PRIORITIES: Record<string, number> = {};
let i = 0;
for (const letter of ALPHABET) {
  PRIORITIES[letter] = ++i;
}

const sum = (a: number, b: number) => a + b;

const toUniqueOnly = (text: string) => [...new Set(text)].join('');

const result = data.split('\n').reduce((result, rucksack) => {
  const left = toUniqueOnly(rucksack.slice(0, rucksack.length / 2));
  const right = toUniqueOnly(rucksack.slice(rucksack.length / 2));
  return (
    result +
    [...left]
      .filter(letter => right.includes(letter))
      .map(letter => PRIORITIES[letter])
      .reduce(sum, 0)
  );
}, 0);

console.log(result);
