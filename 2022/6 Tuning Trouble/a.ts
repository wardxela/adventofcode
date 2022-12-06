import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

let startIndex = 0;
let marker = '';
let currentIndex = 0;

const markerLength = 4;

startIndexLoop: while (startIndex < data.length) {
  marker = '';
  currentIndex = startIndex;
  while (currentIndex < data.length) {
    marker += data[currentIndex];
    if (new Set(marker).size !== marker.length) {
      break;
    }
    if (marker.length === markerLength) {
      break startIndexLoop;
    }
    currentIndex++;
  }
  startIndex++;
}
console.log(currentIndex + 1);
