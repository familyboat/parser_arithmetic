export type TokenKind =
  | IntegerToken
  | OperatorTokenKind
  | LeftParenthesisToken
  | RightParenthesisToken
  | NoneToken;

export type OperatorTokenKind =
  | PlusToken
  | MinusToken
  | MultiToken
  | DivideToken;

export function isLeftParenthesisToken(token: unknown): token is LeftParenthesisToken {
  return token !== null && typeof token === 'object' && (token as Pick<Token, 'type'>).type === symbolLeftParenthesis;
}

export function isRightParenthesisToken(token: unknown): token is RightParenthesisToken {
  return token !== null && typeof token === 'object' && (token as Pick<Token, 'type'>).type === symbolRightParenthesis;
}

export function isOperatorToken(token: unknown): token is OperatorTokenKind {
  return isPlusToken(token) || isMinusToken(token) || isMultiToken(token) ||
    isDivideToken(token);
}

export function isIntegerToken(token: unknown): token is IntegerToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolInteger;
}

export function isPlusToken(token: unknown): token is PlusToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolPlus;
}

export function isMinusToken(token: unknown): token is MinusToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolMinus;
}

export function isMultiToken(token: unknown): token is MultiToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolMulti;
}

export function isDivideToken(token: unknown): token is DivideToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolDivide;
}

export function isNoneToken(token: unknown): token is NoneToken {
  return token !== null && typeof token === "object" &&
    (token as Pick<Token, "type">).type === symbolNone;
}

type ValueType = number | "+" | "-" | "*" | "/" | "" | "(" | ")";

interface Token {
  /**
   * 原始内容
   */
  content: string;
  /**
   * token 代表的值
   */
  value: ValueType;
  /**
   * 标识 token 的类型
   */
  type: symbol;
  /**
   * 标识 token 的范围
   */
  range: Range;
  /**
   * 转换为 JSON 结构化数据
   */
  toJSON(): unknown;
}

class BaseToken<T extends ValueType> implements Token {
  content: string;
  value: T;
  type: symbol;
  range: Range;

  constructor(content: string, value: T, type: symbol, range: Range) {
    this.content = content;
    this.value = value;
    this.type = type;
    this.range = range;
  }

  toJSON(): unknown {
    return {
      content: this.content,
      value: this.value,
      type: this.type,
      range: this.range,
    };
  }
}

type IntegerType = 'integer' | 'positive' | 'negtive';
/**
 * 整数
 */
export class IntegerToken extends BaseToken<number> {
  integerType: IntegerType;

  constructor(content: string, range: Range, integerType: IntegerType = 'integer') {
    let value: number
    const contentLength = content.length;
    if (integerType === 'integer') {
      value = +content;
    } else {
      value = +(content.slice(1, contentLength - 1));
      console.log(value, content);
    }
    super(content, value, symbolInteger, range);
    this.integerType = integerType
  }

  pretty(): string {
    if (this.integerType === 'integer') {
      return this.content;
    } else if (this.integerType === 'positive') {
      return `( +${this.value} )`
    } else {
      return `( ${this.value} )`
    }
  }

  evaluate(): number {
    return this.value;
  }
}

const symbolInteger = Symbol.for("integer");

/**
 * 加号
 */
export class PlusToken extends BaseToken<"+"> {
  constructor(range: Range) {
    super("+", "+", symbolPlus, range);
  }
}
const symbolPlus = Symbol.for("plus");

/**
 * 减号
 */
export class MinusToken extends BaseToken<"-"> {
  constructor(range: Range) {
    super("-", "-", symbolMinus, range);
  }
}
const symbolMinus = Symbol.for("minus");

/**
 * 乘号
 */
export class MultiToken extends BaseToken<"*"> {
  constructor(range: Range) {
    super("*", "*", symbolMulti, range);
  }
}
const symbolMulti = Symbol.for("multi");

/**
 * 除号
 */
export class DivideToken extends BaseToken<"/"> {
  constructor(range: Range) {
    super("/", "/", symbolDivide, range);
  }
}
const symbolDivide = Symbol.for("divide");

/**
 * 表示解析结束
 */
export class NoneToken extends BaseToken<""> {
  constructor(range: Range) {
    super("", "", symbolNone, range);
  }
}
const symbolNone = Symbol.for("none");

/**
 * 表示左圆括号
 */
export class LeftParenthesisToken extends BaseToken<'('> {
  constructor(range: Range) {
    super('(', '(', symbolLeftParenthesis, range);
  }
}
const symbolLeftParenthesis = Symbol.for('leftParenthesis');

/**
 * 表示右圆括号
 */
export class RightParenthesisToken extends BaseToken<')'> {
  constructor(range: Range) {
    super(')', ')', symbolRightParenthesis, range);
  }
}
const symbolRightParenthesis = Symbol.for('rightParenthesis');

/**
 * 表示 token 的范围
 */
export class Range {
  #start: number;
  /**
   * 起始索引，包含
   */
  get start(): number {
    return this.#start;
  }

  #end: number;
  /**
   * 终止索引，不包含
   */
  get end(): number {
    return this.#end;
  }

  constructor(start: number, end: number) {
    this.#start = start;
    this.#end = end;
  }

  toJSON(): unknown {
    return {
      start: this.#start,
      end: this.#end,
    };
  }
}
