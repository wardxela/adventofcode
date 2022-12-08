import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const trees = data.split('\n').map(row => row.split('').map(v => +v));

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
] as const;

let visibleTrees = 0;

for (let i in trees) {
  for (let j in trees[i]) {
    directionsLoop: for (const [offsetX, offsetY] of directions) {
      let x = +i + offsetX;
      let y = +j + offsetY;
      while (x >= 0 && x < trees[i].length && y >= 0 && y < trees.length) {
        if (trees[i][j] <= trees[x][y]) {
          continue directionsLoop;
        }
        x += offsetX;
        y += offsetY;
      }
      visibleTrees++;
      break;
    }
  }
}

console.log(visibleTrees);
