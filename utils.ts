import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export async function getPuzzleInput(url: string) {
  const puzzleInputPath = path.resolve(fileURLToPath(url), '../input.txt');
  const file = await readFile(puzzleInputPath);
  return file.toString();
}
