import { inspect } from 'util';
import { getPuzzleInput } from '../../utils.js';

const data = await getPuzzleInput(import.meta.url);

type Operator = '+' | '-' | '*' | '/';

type Operation = {
  operator: Operator;
  operand: number | 'old';
};

class Monkey {
  public inspectCounter = 0;
  constructor(
    public id: number,
    private items: number[],
    private operation: Operation,
    public divisibleBy: number,
    private trueMonkeyId: number,
    private falseMonkeyId: number
  ) {}

  inspect(controller: MonkeyController) {
    const items = [...this.items];
    this.items = [];
    items.forEach(level => {
      this.inspectCounter++;
      level =
        calc(
          level,
          this.operation.operand === 'old' ? level : this.operation.operand,
          this.operation.operator
        ) % controller.commonDivider;
      controller.sendItem(
        level,
        level % this.divisibleBy === 0 ? this.trueMonkeyId : this.falseMonkeyId
      );
    });
  }

  addItem(value: number) {
    this.items.push(value);
  }
}

class MonkeyController {
  private monkeyMap: Record<number, Monkey>;
  public commonDivider: number;

  constructor(monkeys: Monkey[]) {
    this.monkeyMap = monkeys.reduce<Record<number, Monkey>>((map, monkey) => {
      map[monkey.id] = monkey;
      return map;
    }, {});
    this.commonDivider = monkeys.reduce((a, m) => a * m.divisibleBy, 1);
  }

  debug() {
    console.log(inspect(this.monkeyMap, true, null, true));
  }

  play(rounds: number) {
    for (let i = 0; i < rounds; i++) {
      Object.values(this.monkeyMap)
        .sort((a, b) => a.id - b.id)
        .forEach(monkey => monkey.inspect(this));
    }
  }

  sendItem(value: number, toId: number) {
    this.monkeyMap[toId].addItem(value);
  }

  getMonkeyBusinessLevel() {
    return Object.values(this.monkeyMap)
      .sort((a, b) => b.inspectCounter - a.inspectCounter)
      .slice(0, 2)
      .map(m => m.inspectCounter)
      .reduce((a, b) => a * b, 1);
  }
}

function calc(op1: number, op2: number, operator: Operator) {
  switch (operator) {
    case '+':
      return op1 + op2;
    case '-':
      return op1 - op2;
    case '*':
      return op1 * op2;
    case '/':
      return op1 / op2;
  }
}

const monkeyRegExp =
  /Monkey (\d+):\s+Starting items: ([\d\s,]+)\s+Operation: new = old([\s\d\*\+-/old]+)\s+Test: divisible by (\d+)\s+If true: throw to monkey (\d+)\s+If false: throw to monkey (\d+)/g;

const monkeyController = new MonkeyController(
  [...data.matchAll(monkeyRegExp)].map(
    ([_, id, items, operation, divisibleBy, trueMonkeyId, falseMonkeyId]) => {
      const [operator, operand] = operation.trim().split(' ');
      return new Monkey(
        +id,
        items
          .trim()
          .split(', ')
          .map(v => +v),
        {
          operator: operator as Operator,
          operand: operand === 'old' ? operand : +operand,
        },
        +divisibleBy,
        +trueMonkeyId,
        +falseMonkeyId
      );
    }
  )
);

monkeyController.play(10000);
const result1 = monkeyController.getMonkeyBusinessLevel();
monkeyController.debug();
console.log(result1);
