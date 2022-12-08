import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

const trees = data.split('\n').map(row => row.split('').map(v => +v));

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
] as const;

let bestScore = -1;

for (let i in trees) {
  for (let j in trees[i]) {
    let score = 1;
    for (const [offsetX, offsetY] of directions) {
      let x = +i + offsetX;
      let y = +j + offsetY;
      let directionScore = 0;
      while (x >= 0 && x < trees[i].length && y >= 0 && y < trees.length) {
        directionScore++;
        if (trees[i][j] <= trees[x][y]) {
          break;
        }
        x += offsetX;
        y += offsetY;
      }
      score *= directionScore;
    }
    if (score > bestScore) {
      bestScore = score;
    }
  }
}

console.log(bestScore);
