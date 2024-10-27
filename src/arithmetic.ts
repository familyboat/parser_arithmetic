import { type IntegerToken, isIntegerToken, NoneToken, type TokenKind } from "./token.ts";

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
  toString(): string;
  /**
   * 格式化
   */
  pretty(): string;
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
  getLeft(): number {
    return isIntegerToken(this.left) ? this.left.value : this.left.evaluate();
  }

  /**
   * 获取右操作数的值
   */
  getRight(): number {
    return isIntegerToken(this.right)
      ? this.right.value
      : this.right.evaluate();
  }

  toJSON(): unknown {
    return {
      name: `${this}`,
      children: {
        left: this.left,
        right: this.right,
      },
    };
  }

  prettyLeft(): string {
    return isIntegerToken(this.left) ? this.left.content : this.left.pretty();
  }

  prettyRight(): string {
    return isIntegerToken(this.right)
      ? this.right.content
      : this.right.pretty();
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

  override toString(): string {
    return "PlusArithmetic";
  }

  pretty(): string {
    return `${this.prettyLeft()} + ${this.prettyRight()}`;
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

  override toString(): string {
    return "MinusAtirhmetic";
  }

  pretty(): string {
    return `${this.prettyLeft()} - ${this.prettyRight()}`;
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

  override toString(): string {
    return "MultiArithmetic";
  }

  pretty(): string {
    return `${this.prettyLeft()} * ${this.prettyRight()}`;
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

  override toString(): string {
    return "DivideArithmetic";
  }

  pretty(): string {
    return `${this.prettyLeft()} / ${this.prettyRight()}`;
  }
}

type ChildrenType = Array<Exclude<TokenKind, NoneToken> | ParenthesisArithmetic>

/**
 * 圆括号表达式
 */
export class ParenthesisArithmetic {
  children: ChildrenType;

  constructor(children: ChildrenType) {
    this.children = children;
  }
}
