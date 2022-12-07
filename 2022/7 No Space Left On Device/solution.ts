import { getPuzzleInput } from '../../utils.js';

interface File {
  type: 'file';
  size: number;
}

interface Directory {
  type: 'dir';
  parent: null | Directory;
  content: Record<string, Directory | File | undefined>;
}

interface DirectorySizes {
  size: number;
  nested: Record<string, DirectorySizes>;
}

class FileSystem {
  private dir: Directory;

  constructor() {
    this.dir = {
      type: 'dir',
      parent: null,
      content: {},
    };
  }

  public md(name: string) {
    this.dir.content[name] = {
      type: 'dir',
      parent: this.dir,
      content: {},
    };
  }

  public touch(name: string, size: number) {
    this.dir.content[name] = {
      type: 'file',
      size,
    };
  }

  public cd(path: string) {
    switch (path) {
      case '/':
        while (this.dir.parent) {
          this.dir = this.dir.parent;
        }
        break;
      case '..':
        if (this.dir.parent) {
          this.dir = this.dir.parent;
        } else {
          throw new Error(`You can't move any higher`);
        }
        break;
      default:
        const nestedDir = this.dir.content[path];
        if (!nestedDir) {
          throw new Error(`Directory with name ${path} doesn't exist`);
        }
        if (nestedDir.type === 'file') {
          throw new Error(`You can't move into a file`);
        }
        this.dir = nestedDir;
    }
  }

  public calcSizes(result: DirectorySizes = { size: 0, nested: {} }) {
    const items = Object.entries(this.dir.content);
    const files = items.filter(([_, content]) => content!.type === 'file') as [
      string,
      File
    ][];
    const dirs = items.filter(([_, content]) => content!.type === 'dir') as [
      string,
      Directory
    ][];
    const filesSize = files.reduce(
      (acc, [_, content]) => acc + content.size,
      0
    );
    dirs.forEach(([name]) => {
      result.nested[name] = {
        nested: {},
        size: 0,
      };
      this.cd(name);
      this.calcSizes(result.nested[name]);
      this.cd('..');
    });
    const nestedSize = Object.values(result.nested).reduce(
      (acc, dir) => acc + dir.size,
      0
    );
    result.size = filesSize + nestedSize;
    return result;
  }

  public display(lvl = 1, dirName = '/') {
    console.log(`${' '.repeat(lvl)}- ${dirName} (dir)`);
    const items = Object.entries(this.dir.content);
    const dirs = items.filter(([_, obj]) => obj!.type === 'dir') as [
      string,
      Directory
    ][];
    const files = items.filter(([_, obj]) => obj!.type === 'file') as [
      string,
      File
    ][];
    files.forEach(([name, content]) => {
      console.log(
        `${' '.repeat(lvl + 2)}- ${name} (file, size=${content.size})`
      );
    });
    dirs.forEach(([name, content]) => {
      this.cd(name);
      this.display(lvl + 2, name);
      this.cd('..');
    });
  }
}

const data = await getPuzzleInput(import.meta.url);
const fileSystem = new FileSystem();

let isListingContent = false;

data.split('\n').forEach(line => {
  if (line.startsWith('$')) {
    if (isListingContent) {
      isListingContent = false;
    }
    const [command, arg] = line.slice(2).split(' ');
    switch (command) {
      case 'ls':
        isListingContent = true;
        break;
      case 'cd':
        fileSystem.cd(arg);
        break;
    }
    return;
  }
  if (line.startsWith('dir')) {
    fileSystem.md(line.slice(4));
  } else {
    const [size, name] = line.split(' ');
    fileSystem.touch(name, +size);
  }
});

fileSystem.cd('/');
const sizes = fileSystem.calcSizes();

function problem1(dir: DirectorySizes): number {
  return (
    (dir.size <= 100000 ? dir.size : 0) +
    Object.values(dir.nested).reduce((acc, nested) => acc + problem1(nested), 0)
  );
}

const TOTAL = 70000000;
const NEEDED = 30000000;
const UNUSED = TOTAL - sizes.size;

function problem2(dir: DirectorySizes, result: number[] = []): number[] {
  if (UNUSED + dir.size >= NEEDED) {
    result.push(dir.size);
  }
  Object.values(dir.nested).forEach(nestedDir => problem2(nestedDir, result));
  return result;
}

const solution1 = problem1(sizes);
const solution2 = Math.min(...problem2(sizes));

console.log(solution2);
