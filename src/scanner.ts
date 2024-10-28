import { ParseError, ParseErrorKind } from "./error.ts";
import {
  DivideToken,
  IntegerToken,
  MinusToken,
  MultiToken,
  NoneToken,
  PlusToken,
  Range,
  type TokenKind,
} from "./token.ts";

/**
 * 扫描器，将文本转换为 token 流
 */
export class Scanner {
  /**
   * 待解析的文本
   */
  #text: string;
  /**
   * 字符索引
   */
  #charIndex: number;
  /**
   * token 的起始索引
   */
  #tokenStart: number;

  constructor(text: string) {
    this.#text = text;
    this.#charIndex = 0;
    this.#tokenStart = 0;
  }

  /**
   * 从待解析的字符串中扫描出一个 token
   */
  scan(): TokenKind {
    this.#skipWhitespace();
    this.#tokenStart = this.#charIndex;
    const currentChar = this.#currentChar();
    if (this.#isEof()) {
      const start = this.#charIndex;
      const end = start + 1;
      const range = new Range(start, end);
      return new NoneToken(range);
    }
    if (this.#isDigit()) {
      return this.#parseInteger();
    } else if (currentChar === "+") {
      return this.#parsePlus();
    } else if (currentChar === "-") {
      return this.#parseMinus();
    } else if (currentChar === "*") {
      return this.#parseMulti();
    } else if (currentChar === "/") {
      return this.#parseDivide();
    } else if (currentChar === "(") {
      return this.#parseLeftParenthesis();
    } else {
      this.#createErrorForCurrentChar(ParseErrorKind.ValidError);
    }
  }

  #parseInteger(): IntegerToken {
    if (this.#isZero()) {
      this.#moveNextChar();
      const tokenEnd = this.#charIndex;
      this.#skipWhitespace();
      if (this.#isOperator() || this.#isEof()) {
        const range = new Range(this.#tokenStart, tokenEnd);
        return new IntegerToken("0", range);
      } else {
        this.#createErrorForStart(this.#tokenStart, ParseErrorKind.ZeroError);
      }
    } else {
      this.#moveNextChar();
      while (this.#isDigit()) {
        this.#moveNextChar();
      }
      const tokenEnd = this.#charIndex;
      this.#skipWhitespace();
      if (this.#isOperator() || this.#isEof()) {
        const range = new Range(this.#tokenStart, tokenEnd);
        const content = this.#text.slice(this.#tokenStart, tokenEnd);
        return new IntegerToken(content, range);
      } else {
        this.#createErrorForStart(
          this.#tokenStart,
          ParseErrorKind.NonZeroError,
        );
      }
    }
  }

  #parsePlus(): PlusToken {
    this.#moveNextChar();
    const tokenEnd = this.#charIndex;
    this.#skipWhitespace();
    if (this.#isDigit() || this.#isLeftParenthesis()) {
      const range = new Range(this.#tokenStart, tokenEnd);
      return new PlusToken(range);
    } else {
      this.#createErrorForStart(this.#tokenStart, ParseErrorKind.OperatorError);
    }
  }

  #parseMinus(): MinusToken {
    this.#moveNextChar();
    const tokenEnd = this.#charIndex;
    this.#skipWhitespace();
    if (this.#isDigit() || this.#isLeftParenthesis()) {
      const range = new Range(this.#tokenStart, tokenEnd);
      return new MinusToken(range);
    } else {
      this.#createErrorForStart(this.#tokenStart, ParseErrorKind.OperatorError);
    }
  }

  #parseMulti(): MultiToken {
    this.#moveNextChar();
    const tokenEnd = this.#charIndex;
    this.#skipWhitespace();
    if (this.#isDigit() || this.#isLeftParenthesis()) {
      const range = new Range(this.#tokenStart, tokenEnd);
      return new MultiToken(range);
    } else {
      this.#createErrorForStart(this.#tokenStart, ParseErrorKind.OperatorError);
    }
  }

  #parseDivide(): DivideToken {
    this.#moveNextChar();
    const tokenEnd = this.#charIndex;
    this.#skipWhitespace();
    if (this.#isDigit() || this.#isLeftParenthesis()) {
      const range = new Range(this.#tokenStart, tokenEnd);
      return new DivideToken(range);
    } else {
      this.#createErrorForStart(this.#tokenStart, ParseErrorKind.OperatorError);
    }
  }

  #parseLeftParenthesis(): IntegerToken {
    this.#moveNextChar();
    this.#skipWhitespace();
    const currentChar = this.#currentChar();
    if (currentChar === "+" || currentChar === "-") {
      const type = currentChar === "+" ? "positive" : "negtive";
      this.#moveNextChar();
      if (this.#isZero()) {
        this.#moveNextChar();
        this.#skipWhitespace();
        const endChar = this.#currentChar();

        this.#moveNextChar();
        const tokenEnd = this.#charIndex;
        this.#skipWhitespace();

        if (endChar === ")" && (this.#isOperator() || this.#isEof())) {
          const range = new Range(this.#tokenStart, tokenEnd);
          return new IntegerToken(
            this.#text.slice(this.#tokenStart, tokenEnd),
            range,
            type,
          );
        } else {
          this.#createErrorForStart(
            this.#tokenStart,
            ParseErrorKind.SignedIntegerError,
          );
        }
      } else if (this.#isOneToNine()) {
        this.#moveNextChar();
        while (this.#isDigit()) {
          this.#moveNextChar();
        }

        this.#skipWhitespace();
        const maybeTokenEndChar = this.#currentChar();

        this.#moveNextChar();
        const maybeTokenEnd = this.#charIndex;
        this.#skipWhitespace();

        if (
          maybeTokenEndChar === ")" && (this.#isOperator() || this.#isEof())
        ) {
          const range = new Range(this.#tokenStart, maybeTokenEnd);
          return new IntegerToken(
            this.#text.slice(this.#tokenStart, maybeTokenEnd),
            range,
            type,
          );
        } else {
          this.#createErrorForStart(
            this.#tokenStart,
            ParseErrorKind.SignedIntegerError,
          );
        }
      } else {
        this.#createErrorForStart(
          this.#tokenStart,
          ParseErrorKind.SignedIntegerError,
        );
      }
    } else {
      this.#createErrorForStart(
        this.#tokenStart,
        ParseErrorKind.SignedIntegerError,
      );
    }
  }

  // #parseRightParenthesis(): RightParenthesisToken {

  // }

  createErrorForToken(token: TokenKind, kind: ParseErrorKind): never {
    const range = token.range;
    this.#createErrorForRange(range, kind);
  }

  #createErrorForCurrentChar(kind: ParseErrorKind): never {
    this.#createErrorForStart(this.#charIndex, kind);
  }

  #createErrorForStart(start: number, kind: ParseErrorKind): never {
    const range = new Range(start, start + 1);
    this.#createErrorForRange(range, kind);
  }

  #createErrorForRange(range: Range, kind: ParseErrorKind): never {
    const error = new ParseError(range, kind, this.#text);
    throw new Error(`${error}`);
  }

  /**
   * 获取当前字符
   */
  #currentChar(): string | null {
    if (this.#charIndex < this.#text.length) {
      return this.#text[this.#charIndex];
    }

    return null;
  }

  /**
   * 索引移到下一个字符
   */
  #moveNextChar() {
    this.#charIndex++;
  }

  /**
   * 跳过空格字符
   */
  #skipWhitespace() {
    while ((this.#currentChar()) !== null) {
      if (this.#isWhitespace()) {
        this.#moveNextChar();
      } else {
        break;
      }
    }
  }

  #isWhitespace() {
    return this.#currentChar() === " ";
  }

  #isDigit() {
    return this.#isZero() || this.#isOneToNine();
  }

  #isZero() {
    return this.#currentChar() === "0";
  }

  #isOneToNine() {
    const currentChar = this.#currentChar();
    return currentChar !== null &&
      "1,2,3,4,5,6,7,8,9".split(",").includes(currentChar);
  }

  #isOperator() {
    const currentChar = this.#currentChar();
    return currentChar !== null && "+,-,*,/".split(",").includes(currentChar);
  }

  #isEof() {
    return this.#currentChar() === null;
  }

  #isLeftParenthesis() {
    return this.#currentChar() === "(";
  }
}
