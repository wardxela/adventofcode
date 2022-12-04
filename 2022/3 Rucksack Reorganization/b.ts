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

const result = data
  .split('\n')
  .reduce<string[][]>((result, current) => {
    if (result.length && result[result.length - 1].length < 3) {
      result[result.length - 1].push(current);
    } else {
      result.push([current]);
    }
    return result;
  }, [])
  .reduce((result, rucksacks) => {
    const counter: Record<string, number> = {};
    [...rucksacks.map(toUniqueOnly).join('')].forEach(letter => {
      if (counter[letter]) {
        counter[letter] += 1;
      } else {
        counter[letter] = 1;
      }
    });
    return (
      result +
      Object.entries(counter)
        .filter(pair => pair[1] === 3)
        .map(pair => PRIORITIES[pair[0]])
        .reduce(sum, 0)
    );
  }, 0);

console.log(result);
