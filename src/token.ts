export type TokenKind =
  | IntegerToken
  | PlusToken
  | MinusToken
  | MultiToken
  | DivideToken
  | NoneToken;

interface Token {
  /**
   * 原始内容
   */
  content: string;
  /**
   * token 代表的值
   */
  value: number | "+" | "-" | "*" | "/" | "";
  /**
   * 标识 token 的类型
   */
  type: symbol;
  /**
   * 标识 token 的范围
   */
  range: Range;
}

/**
 * 整数
 */
export class IntegerToken implements Token {
  content: string;
  value: number;
  type = symbolInteger;
  range: Range;

  constructor(content: string, range: Range) {
    this.content = content;
    this.value = +content;
    this.range = range;
  }
}
export const symbolInteger = Symbol.for("integer");

/**
 * 加号
 */
export class PlusToken implements Token {
  content: "+" = "+";
  value = this.content;
  type = symbolPlus;
  range: Range;

  constructor(range: Range) {
    this.range = range;
  }
}
export const symbolPlus = Symbol.for("plus");

/**
 * 减号
 */
export class MinusToken implements Token {
  content: "-" = "-";
  value = this.content;
  type = symbolMinus;
  range: Range;

  constructor(range: Range) {
    this.range = range;
  }
}
export const symbolMinus = Symbol.for("minus");

/**
 * 乘号
 */
export class MultiToken implements Token {
  content: "*" = "*";
  value = this.content;
  type = symbolMulti;
  range: Range;

  constructor(range: Range) {
    this.range = range;
  }
}
export const symbolMulti = Symbol.for("multi");

/**
 * 除号
 */
export class DivideToken implements Token {
  content: "/" = "/";
  value = this.content;
  type = symbolDivide;
  range: Range;

  constructor(range: Range) {
    this.range = range;
  }
}
export const symbolDivide = Symbol.for("divide");

/**
 * 表示解析结束
 */
export class NoneToken implements Token {
  content: "" = "";
  value = this.content;
  type = symbolNone;
  range = new Range(-1, -1);
}
export const symbolNone = Symbol.for("none");

/**
 * 表示 token 的范围
 */
export class Range {
  /**
   * 起始索引，包含
   */
  start: number;

  /**
   * 终止索引，不包含
   */
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}
