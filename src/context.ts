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
import { isRightParenthesisToken } from "./token.ts";
import { isLeftParenthesisToken } from "./token.ts";
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
   * 下一个要处理的 token
   */
  #nextToken: TokenKind | null = null;
  /**
   * 记录圆括号的层级
   */
  #stack = 0;

  constructor(text: string) {
    this.#scanner = new Scanner(text);
  }

  /**
   * 解析为 ast
   */
  parseAst(): PossibleOperand {
    let leftOperand: PossibleOperand | null = null;

    while (true) {
      let token;
      if (this.#nextToken === null) {
        token = this.#scanner.scan();
      } else {
        token = this.#nextToken;
        this.#nextToken = null;
      }

      // 解析到结束 token，解析过程结束
      if (isNoneToken(token)) {
        break;
      }

      // 解析到圆括号表达的右圆括号，圆括号表达式解析结束
      if ((isRightParenthesisToken(token) && this.#stack > 0)) {
        this.#stack--;
        break;
      }

      // 解析到的第一个 token，且该 token 为数字
      if (isIntegerToken(token) && leftOperand === null) {
        leftOperand = token;
        continue;
      }

      // 解析到的第一个 token，且该 token 为左圆括号
      if (isLeftParenthesisToken(token)) {
        leftOperand = this.#parseParenthesis();
        continue;
      }

      // 开始解析运算符类型的 token，此时应该已经有运算符所需的左操作数
      if (leftOperand === null) {
        this.#scanner.createErrorForToken(
          token,
          ParseErrorKind.ArithmeticError,
        );
      }

      let arithmetic: PossibleOperand | null = null;

      if (isPlusToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new PlusArithmetic(leftOperand, rightOperand);
      } else if (isMinusToken(token)) {
        const rightOperand = this.#parsePlusOrMinusOrMultiOrDivide(token);
        arithmetic = new MinusAtirhmetic(leftOperand, rightOperand);
      } else if (isMultiToken(token) || isDivideToken(token)) {
        arithmetic = this.#parseAllMultiOrDivide(leftOperand, token);
      } else {
        this.#scanner.createErrorForToken(
          token,
          ParseErrorKind.ArithmeticError,
        );
      }

      leftOperand = arithmetic;
      console.assert(leftOperand !== null, "表达式解析出错");
    }

    return leftOperand as unknown as PossibleOperand;
  }

  /**
   * 解析为值
   */
  parse(): number | undefined {
    const leftOperand = this.parseAst();

    // 对生成的 ast 进行计算
    return leftOperand.evaluate();
  }

  /**
   * 解析加减乘除的右操作数
   */
  #parsePlusOrMinusOrMultiOrDivide(
    previousToken: OperatorTokenKind,
  ): PossibleOperand {
    /**
     * 应该为数字类型的 token 或者左圆括号 token
     */
    const firstToken = this.#scanner.scan();
    /**
     * 应该为运算符类型的 token 或者解析结束的 token 或者右圆括号 token
     */
    const secondToken = this.#scanner.scan();

    if (isIntegerToken(firstToken)) {
      if (
        isRightParenthesisToken(secondToken) ||
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
    } else if (isLeftParenthesisToken(firstToken)) {
      this.#nextToken = secondToken;
      const leftOperand = this.#parseParenthesis();
      const nextToken = this.#scanner.scan();
      if (isMultiToken(nextToken) || isDivideToken(nextToken)) {
        return this.#parseAllMultiOrDivide(leftOperand, nextToken);
      }
      this.#nextToken = nextToken;
      return leftOperand;
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
   * 解析圆括号内的表达式，直到遇到左圆括号相对应的右圆括号
   */
  #parseParenthesis(): PossibleOperand {
    this.#stack++;
    return this.parseAst();
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
