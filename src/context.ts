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
  isPlusToken,
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
  parseAst() {
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
        const rightOperand = this.#parsePlusOrMinus();
        arithmetic = new PlusArithmetic(leftOperand, rightOperand);
      } else if (isMinusToken(token)) {
        const rightOperand = this.#parsePlusOrMinus();
        arithmetic = new MinusAtirhmetic(leftOperand, rightOperand);
      } else if (isMultiToken(token)) {
        const rightOperand = this.#parseMultiOrDivide();
        arithmetic = new MultiArithmetic(leftOperand, rightOperand);
      } else if (isDivideToken(token)) {
        const rightOperand = this.#parseMultiOrDivide();
        arithmetic = new DivideArithmetic(leftOperand, rightOperand);
      }

      this.#leftOperand = arithmetic;
    }

    return this.#leftOperand;
  }

  /**
   * 解析为值
   */
  parse() {
    this.parseAst();

    // 对生成的 ast 进行计算
    this.#leftOperand?.evaluate();
  }

  /**
   * 解析加减法的右操作数
   */
  #parsePlusOrMinus(): PossibleOperand {
    const firstToken = this.#scanner.scan();
    const secondToken = this.#scanner.scan();

    if (isIntegerToken(firstToken)) {
      if (
        (isPlusToken(secondToken) || isMinusToken(secondToken)) ||
        isNoneToken(secondToken)
      ) {
        this.#nextToken = secondToken;
        return firstToken;
      } else if (isMultiToken(secondToken)) {
        const rightOperand = this.#parseMultiOrDivide();
        return new MultiArithmetic(firstToken, rightOperand);
      } else if (isDivideToken(secondToken)) {
        const rightOperand = this.#parseMultiOrDivide();
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
   * 解析乘除法的右操作数
   */
  #parseMultiOrDivide(): PossibleOperand {
    const firstToken = this.#scanner.scan();
    const secondToken = this.#scanner.scan();
    if (isIntegerToken(firstToken)) {
      if (
        (isPlusToken(secondToken) || isMinusToken(secondToken)) ||
        isNoneToken(secondToken)
      ) {
        this.#nextToken = secondToken;
        return firstToken;
      } else if (isMultiToken(secondToken)) {
        const rightOperand = this.#parseMultiOrDivide();
        return new MultiArithmetic(firstToken, rightOperand);
      } else if (isDivideToken(secondToken)) {
        const rightOperand = this.#parseMultiOrDivide();
        return new DivideArithmetic(firstToken, rightOperand);
      } else {
        this.#scanner.createErrorForToken(
          firstToken,
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
}
