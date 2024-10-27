import type { Range } from "./token.ts";

/**
 * 表示解析过程中发生的错误
 */
export class ParseError {
  #range: Range;
  #kind: ParseErrorKind;
  #text: string;

  constructor(range: Range, kind: ParseErrorKind, text: string) {
    this.#range = range;
    this.#kind = kind;
    this.#text = text;
  }

  /**
   * 格式化错误信息
   */
  toString() {
    const header = `解析${this.#kind}过程中出现错误\n`;
    const main = `${this.#text}\n`;
    const start = this.#range.start;
    const end = this.#range.end;
    const footer = `${" ".repeat(start)}${"~".repeat(end - start)}`;
    const messge = `${header}${main}${footer}`;

    return messge;
  }
}

/**
 * 解析错误的种类
 */
export enum ParseErrorKind {
  /**
   * 解析零出错，零的下一个合法的字符只能是运算符
   */
  ZeroError = "zero",
  /**
   * 解析非零出错，非零的下一个合法的字符只能是运算符
   */
  NonZeroError = "nonZero",
  /**
   * 解析运算符出错，运算符的后面不允许接运算符，可以接空格、整数
   */
  OperatorError = "operator",
  /**
   * 解析合法字符出错
   */
  ValidError = "valid",
  /**
   * 表达式构建出错
   */
  ArithmeticError = "arithmetic",
}
