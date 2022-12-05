import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const [initialData, instructions] = data.split('\n\n');
const [columnNamesRaw, ...rows] = initialData.split('\n').reverse();

const stackNames = columnNamesRaw.split(/\s+/).slice(1, -1);

const stacks = stackNames.reduce((result, name) => {
  result[name] = [];
  return result;
}, {} as Record<string, string[]>);

for (const row of rows) {
  let currentStack = 0;
  let shouldAdd = false;
  for (let i = 0; i < row.length; i++) {
    if ((i + 1) % 4 === 0 && i !== 0) {
      currentStack++;
    } else if (row[i] === '[') {
      shouldAdd = true;
    } else if (row[i] === ']') {
      shouldAdd = false;
    } else if (shouldAdd) {
      stacks[stackNames[currentStack]].push(row[i]);
    }
  }
}

instructions.split('\n').forEach(instruction => {
  let state = '';
  let cratesToMove = -1;
  let from = '';
  let to = '';

  instruction.split(' ').forEach(operation => {
    if (/move|from|to/.test(operation)) {
      state = operation;
      return;
    }
    switch (state) {
      case 'move':
        cratesToMove = +operation;
        break;
      case 'from':
        from = operation;
        break;
      case 'to':
        to = operation;
        const crates: string[] = [];
        while (cratesToMove-- !== 0) {
          crates.push(stacks[from].pop()!);
        }
        stacks[to].push(...crates.reverse());
        break;
      default:
        break;
    }
  });
});

const result = stackNames.reduce(
  (fullName, stackName) => `${fullName}${stacks[stackName].at(-1)}`,
  ''
);

console.log(result);
