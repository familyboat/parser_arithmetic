import { IntegerToken, isIntegerToken } from "./token.ts";

/**
 * +、-、*、/ 四种运算合法的操作数
 */
export type PossibleOperand =
  | IntegerToken
  | PlusArithmetic
  | MinusAtirhmetic
  | MultiArithmetic
  | DivideArithmetic;

interface Arithmetic {
  /**
   * 对表达式进行求值
   */
  evaluate(): number;
}

class BaseArithmetic {
  /**
   * 表达式的左操作数
   */
  left: PossibleOperand;
  /**
   * 表达式的右操作数
   */
  right: PossibleOperand;

  constructor(left: PossibleOperand, right: PossibleOperand) {
    this.left = left;
    this.right = right;
  }

  /**
   * 获取左操作数的值
   */
  getLeft() {
    return isIntegerToken(this.left) ? this.left.value : this.left.evaluate();
  }

  /**
   * 获取右操作数的值
   */
  getRight() {
    return isIntegerToken(this.right)
      ? this.right.value
      : this.right.evaluate();
  }
}

/**
 * 加法表达式
 */
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

/**
 * 减法表达式
 */
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

/**
 * 乘法表达式
 */
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

/**
 * 除法表达式
 */
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
