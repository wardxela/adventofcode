import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const stats = {
  cycle: 0,
  x: 1,
  acc: 0,
  tracked: [] as number[],
};

const startCycle = 20;
const cyclesGap = 40;

type State = 'noop' | 'addx1' | 'addx2' | 'addx3' | 'end';

const result = data
  .split('\n')
  .map(instruction => instruction.match(/([a-z]+)( (-?\d+))?/)!)
  .reduce((stats, instruction) => {
    const [_, command, _2, arg] = instruction;
    let state: State = command == 'noop' ? 'noop' : 'addx1';

    machine: while (true) {
      switch (state) {
        case 'noop':
          stats.cycle++;
          state = 'end';
          break;
        case 'addx1':
          stats.cycle++;
          state = 'addx2';
          break;
        case 'addx2':
          stats.cycle++;
          state = 'addx3';
          break;
        case 'addx3':
          stats.x += parseInt(arg);
          state = 'end';
          break;
        case 'end':
          break machine;
      }
      if ((stats.cycle + startCycle) % cyclesGap === 0) {
        if (!stats.tracked.includes(stats.cycle)) {
          stats.tracked.push(stats.cycle);
          stats.acc += stats.cycle * stats.x;
        }
      }
    }
    return stats;
  }, stats);
console.log(result);
