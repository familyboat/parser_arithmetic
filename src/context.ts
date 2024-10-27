import {
  DivideArithmetic,
  MinusAtirhmetic,
  MultiArithmetic,
  PlusArithmetic,
  type PossibleOperand,
} from "./arithmetic.ts";
import { ParseErrorKind } from "./error.ts";
import { Scanner } from "./scanner.ts";
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
      } else if (isMultiToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new MultiArithmetic(leftOperand, rightOperand);
      } else if (isDivideToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new DivideArithmetic(leftOperand, rightOperand);
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
    const firstToken = this.#scanner.scan();
    const secondToken = this.#scanner.scan();

    if (isIntegerToken(firstToken)) {
      if (
        isNoneToken(secondToken) ||
        (isOperatorToken(secondToken) &&
          this.#compareOperatorLevel(previousToken, secondToken))
      ) {
        this.#nextToken = secondToken;
        return firstToken;
      } else if (isMultiToken(secondToken)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(secondToken);
        return new MultiArithmetic(firstToken, rightOperand);
      } else if (isDivideToken(secondToken)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(secondToken);
        return new DivideArithmetic(firstToken, rightOperand);
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
   * 判断两个运算符的等级
   * a 大于等于 b，返回 true。例如：a 是乘法，b 是加法
   */
  #compareOperatorLevel(a: OperatorTokenKind, b: OperatorTokenKind) {
    if (isPlusToken(b) || isMinusToken(b)) return true;
    if (
      (isMultiToken(a) || isDivideToken(a)) &&
      (isMultiToken(b) || isDivideToken(b))
    ) return true;

    return false;
  }
}
