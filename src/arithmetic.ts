import { IntegerToken, symbolInteger } from "./token.ts";

export type PossibleOperand =
  | IntegerToken
  | PlusArithmetic
  | MinusAtirhmetic
  | MultiArithmetic
  | DivideArithmetic;

export function isIntegerToken(token: unknown): token is IntegerToken {
  return typeof token === "object" &&
    (token as { type: symbol }).type === symbolInteger;
}

interface Arithmetic {
  evaluate(): number;
}

class BaseArithmetic {
  left: PossibleOperand;
  right: PossibleOperand;

  constructor(left: PossibleOperand, right: PossibleOperand) {
    this.left = left;
    this.right = right;
  }

  getLeft() {
    return isIntegerToken(this.left) ? this.left.value : this.left.evaluate();
  }

  getRight() {
    return isIntegerToken(this.right)
      ? this.right.value
      : this.right.evaluate();
  }
}

export class PlusArithmetic extends BaseArithmetic implements Arithmetic {
  constructor(left: PossibleOperand, right: PossibleOperand) {
    super(left, right);
  }

  evaluate(): number {
    const left = this.getLeft();
    const right = this.getRight();
    return left + right;
  }
}

export class MinusAtirhmetic extends BaseArithmetic implements Arithmetic {
  constructor(left: PossibleOperand, right: PossibleOperand) {
    super(left, right);
  }

  evaluate(): number {
    const left = this.getLeft();
    const right = this.getRight();
    return left - right;
  }
}

export class MultiArithmetic extends BaseArithmetic implements Arithmetic {
  constructor(left: PossibleOperand, right: PossibleOperand) {
    super(left, right);
  }

  evaluate(): number {
    const left = this.getLeft();
    const right = this.getRight();
    return left * right;
  }
}

export class DivideArithmetic extends BaseArithmetic implements Arithmetic {
  constructor(left: PossibleOperand, right: PossibleOperand) {
    super(left, right);
  }

  evaluate(): number {
    const left = this.getLeft();
    const right = this.getRight();
    return left / right;
  }
}
