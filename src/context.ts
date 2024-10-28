import {
  DivideArithmetic,
  MinusAtirhmetic,
  MultiArithmetic,
  PlusArithmetic,
  type PossibleOperand,
} from "./arithmetic.ts";
import { ParseErrorKind } from "./error.ts";
import { Scanner } from "./scanner.ts";
import type { DivideToken } from "./token.ts";
import type { MultiToken } from "./token.ts";
import {
  isDivideToken,
  isIntegerToken,
  isMinusToken,
  isMultiToken,
  isNoneToken,
  isOperatorToken,
  isPlusToken,
  type OperatorTokenKind,
  type TokenKind,
} from "./token.ts";

/**
 * 保存解析过程中的上下文信息
 */
export class Context {
  #scanner: Scanner;
  /**
   * 左操作数
   */
  #leftOperand: PossibleOperand | null = null;
  /**
   * 下一个要处理的 token
   */
  #nextToken: TokenKind | null = null;

  constructor(text: string) {
    this.#scanner = new Scanner(text);
  }

  /**
   * 解析为 ast
   */
  parseAst(): PossibleOperand | null {
    while (true) {
      let token;
      if (this.#nextToken === null) {
        token = this.#scanner.scan();
      } else {
        token = this.#nextToken;
        this.#nextToken = null;
      }

      if (isNoneToken(token)) {
        break;
      }

      if (isIntegerToken(token)) {
        if (this.#leftOperand === null) {
          this.#leftOperand = token;
          continue;
        } else {
          this.#scanner.createErrorForToken(
            token,
            ParseErrorKind.ArithmeticError,
          );
        }
      }

      if (this.#leftOperand === null) {
        this.#scanner.createErrorForToken(
          token,
          ParseErrorKind.ArithmeticError,
        );
      }

      const leftOperand = this.#leftOperand;
      let arithmetic: PossibleOperand | null = null;

      if (isPlusToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new PlusArithmetic(leftOperand, rightOperand);
      } else if (isMinusToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new MinusAtirhmetic(leftOperand, rightOperand);
      } else if (isMultiToken(token) || isDivideToken(token)) {
        arithmetic = this.#parseAllMultiOrDivide(leftOperand, token);
      }

      this.#leftOperand = arithmetic;
    }

    return this.#leftOperand;
  }

  /**
   * 解析为值
   */
  parse(): number | undefined {
    this.parseAst();

    // 对生成的 ast 进行计算
    return this.#leftOperand?.evaluate();
  }

  /**
   * 解析加减乘除的右操作数
   */
  #parsePlusOrMinusOrMultiOrDivide(
    previousToken: OperatorTokenKind,
  ): PossibleOperand {
    /**
     * 应该为数字类型的 token
     */
    const firstToken = this.#scanner.scan();
    /**
     * 应该为运算符类型的 token 或者解析结束的 token
     */
    const secondToken = this.#scanner.scan();

    if (isIntegerToken(firstToken)) {
      if (
        isNoneToken(secondToken) ||
        (isOperatorToken(secondToken) &&
          this.#compareOperatorLevel(previousToken, secondToken))
      ) {
        this.#nextToken = secondToken;
        return firstToken;
      } else if (isMultiToken(secondToken) || isDivideToken(secondToken)) {
        return this.#parseAllMultiOrDivide(firstToken, secondToken);
      } else {
        this.#scanner.createErrorForToken(
          secondToken,
          ParseErrorKind.ArithmeticError,
        );
      }
    } else {
      this.#scanner.createErrorForToken(
        firstToken,
        ParseErrorKind.ArithmeticError,
      );
    }
  }

  /**
   * 解析乘除法表达式，直到遇到加减法或者解析结束
   */
  #parseAllMultiOrDivide(
    left: PossibleOperand,
    operator: Extract<TokenKind, MultiToken | DivideToken>,
  ): PossibleOperand {
    this.#nextToken = operator;

    let Ctor: typeof MultiArithmetic | typeof DivideArithmetic;
    let rightOperand: PossibleOperand;
    let maybeLeft = left;

    do {
      Ctor = isMultiToken(this.#nextToken) ? MultiArithmetic : DivideArithmetic;
      rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(this.#nextToken);
      maybeLeft = new Ctor(maybeLeft, rightOperand);
    } while (
      isMultiToken(this.#nextToken) || isDivideToken(this.#nextToken)
    );

    const maybe = maybeLeft;
    return maybe;
  }

  /**
   * 判断两个运算符的等级
   * a 大于等于 b，返回 true。例如：a 是乘法，b 是加法
   */
  #compareOperatorLevel(a: OperatorTokenKind, b: OperatorTokenKind) {
    return compareOperatorLevel(a, b);
  }
}

/**
 * 判断两个运算符的等级
 * a 大于等于 b，返回 true。例如：a 是乘法，b 是加法
 */
export function compareOperatorLevel(
  a: OperatorTokenKind,
  b: OperatorTokenKind,
) {
  if (isPlusToken(b) || isMinusToken(b)) return true;
  if (
    (isMultiToken(a) || isDivideToken(a)) &&
    (isMultiToken(b) || isDivideToken(b))
  ) return true;

  return false;
}
