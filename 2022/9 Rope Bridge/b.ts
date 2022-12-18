import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

class Point {
  private x: number;
  private y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  static isInSameSquare(p1: Point, p2: Point) {
    const [x1, y1] = p1.coords();
    const [x2, y2] = p2.coords();
    return Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1;
  }

  static follow(t: Point, h: Point) {
    const [hx, hy] = h.coords();
    const [tx, ty] = t.coords();

    const xdiff = hx - tx;
    const ydiff = hy - ty;

    if (Math.abs(xdiff) === 2) {
      if (xdiff === 2) {
        t.right();
      } else {
        t.left();
      }
      if (ydiff === 1) {
        t.down();
      } else if (ydiff === -1) {
        t.up();
      }
    } else if (Math.abs(ydiff) === 2) {
      if (ydiff === 2) {
        t.down();
      } else {
        t.up();
      }
      if (xdiff === 1) {
        t.right();
      } else if (xdiff === -1) {
        t.left();
      }
    }
  }

  coords() {
    return [this.x, this.y];
  }

  left() {
    this.x--;
  }

  right() {
    this.x++;
  }

  up() {
    this.y--;
  }

  down() {
    this.y++;
  }
}

class Space2d {
  private space: Record<number, Record<number, number>>;

  constructor() {
    this.space = {};
  }

  place(point: Point) {
    const [x, y] = point.coords();
    if (this.space[y]) {
      if (this.space[y][x]) {
        this.space[y][x]++;
      } else {
        this.space[y][x] = 1;
      }
    } else {
      this.space[y] = {
        [x]: 1,
      };
    }
  }

  countVisitedPlaces() {
    return Object.values(this.space)
      .map(obj => Object.keys(obj).length)
      .reduce((a, v) => a + v, 0);
  }
}

const space = new Space2d();

const points: Point[] = [];

for (let i = 0; i < 10; i++) {
  points.push(new Point());
}

const head = points[points.length - 1];
const tail = points[0];

data.split('\n').forEach(command => {
  const [_, direction, count] = command.match(/(L|U|R|D) (\d+)/)!;
  for (let i = 0; i < +count; i++) {
    switch (direction) {
      case 'L':
        head.left();
        break;
      case 'U':
        head.up();
        break;
      case 'R':
        head.right();
        break;
      case 'D':
        head.down();
        break;
      default:
        throw `There is no '${direction}' direction`;
    }
    for (let j = points.length - 1; j > 0; j--) {
      const subhead = points[j];
      const subtail = points[j - 1];
      if (Point.isInSameSquare(subhead, subtail)) {
        continue;
      }
      Point.follow(subtail, subhead);
    }
    space.place(tail);
  }
});

const result = space.countVisitedPlaces();
console.log(result);
