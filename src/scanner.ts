import type { Context } from "./context.ts";
import { die, ID } from "./error.ts";
import { DivideToken, IntegerToken, LeftParenthesisToken, MinusToken, MultiToken, PlusToken, type PossibleToken, type ValueType } from "./token.ts";
import { isBlank, isInteger, isLeftParenthesis, isMultiOrDivide, isNonZero, isOperator, isPlusOrMinus, isRightParenthesis, isZero } from "./util.ts";

class Scanner {
  #context: Context;
  #tokens: Array<PossibleToken> = [];
  get token() {
    return this.#tokens;
  }

  constructor(context: Context) {
    this.#context = context;
  }

  /**
   * 扫描
   */
  scan() {
    while (!this.#context.hasFinished) {
      const char = this.#context.start();
      if (isBlank(char)) {
        this.#context.forward();
        this.#context.stop();
        continue;
      }
      if (isZero(char)) {
        this.#parseZero();
      } else if (isNonZero(char)) {
        this.#parseNonZero();
      } else if (isOperator(char)) {
        this.#parseOperator();
      } else if (isLeftParenthesis(char)) {
        this.#parseLeftParenthesis();
      } else if (isRightParenthesis(char)) {
        this.#parseRightParenthesis();
      }
    }
  }

  /**
   * 解析数字 0
   */
  #parseZero() {
    if (this.#context.forward()) {
      const char = this.#context.getChar();
      if (isLeftParenthesis(char) || isInteger(char)) {
        die(ID.Zero);
      }
    }

    const token = new IntegerToken({
      ...this.#context.stop(),
      value: 0,
    })

    this.#tokens.push(token);
  }

  /**
   * 解析非 0 的数字
   */
  #parseNonZero() {
    if (this.#context.forward()) {
      let char = this.#context.getChar();
      while(isInteger(char)) {
        if (!this.#context.forward()) {
          break;
        }
        char = this.#context.getChar();
      }
      if (isLeftParenthesis(char)) {
        die(ID.NonZero);
      }
    }

    const tokenOption = this.#context.stop();
    const token = new IntegerToken({
      ...tokenOption,
      value: +tokenOption.content,
    });
    this.#tokens.push(token);
  }

  /**
   * 解析运算符
   */
  #parseOperator() {
    if (this.#context.forward()) {
      const char = this.#context.getChar();
      if (isRightParenthesis(char) || isOperator(char)) {
        die(ID.Operator);
      }
    } else {
      die(ID.Operator)
    }

    const tokenOption = this.#context.stop();
    const operator: ValueType = tokenOption.content as ValueType;
    let ctor;
    if (operator === '+') {
      ctor = PlusToken;
    } else if (operator === '-') {
      ctor = MinusToken
    } else if (operator === '*') {
      ctor = MultiToken
    } else if (operator === '/') {
      ctor = DivideToken;
    } else {
      die(ID.Default)
    }

    const token = new ctor({
      ...tokenOption,
      value: operator,
    });

    this.#tokens.push(token);
  }

  /**
   * 解析左圆括号
   */
  #parseLeftParenthesis() {
    if (this.#context.forward()) {
      const char = this.#context.getChar();
      if (isRightParenthesis(char) || isOperator(char)) {
        die(ID.LeftParenthesis);
      }
    } else {
      die(ID.LeftParenthesis)
    }

    const token = new LeftParenthesisToken({
      ...this.#context.stop(),
      value: '(',
    });

    this.#tokens.push(token);
  }

  /**
   * 解析右圆括号
   */
  #parseRightParenthesis() {
    if (this.#context.forward()) {
      const char = this.#context.getChar();
      if (isLeftParenthesis(char) || isInteger(char)) {
        die(ID.RightParenthesis);
      }
    }

    const token = new LeftParenthesisToken({
      ...this.#context.stop(),
      value: ')',
    });

    this.#tokens.push(token);
  }
}

export {
  Scanner
}

