export type ValueType = number | '+' | '-' | '*' | '/' | '(' | ')';

interface Token {
  /**
   * 起始位置，包含
   */
  start: number,
  /**
   * 终止位置，包含
   */
  end: number,
  /**
   * 内容
   */
  content: string,
  /**
   * 内容代表的值
   */
  value: ValueType,
}

class BaseToken {
  start: number;
  end: number;
  content: string;
  value: ValueType;

  constructor({start, end, content, value}: Token) {
    this.start = start;
    this.end = end;
    this.content = content;
    this.value = value;
  }

  toString() {
    return `${this.content}位于${this.start}到${this.end}，值为${this.value}`
  }
}

export class IntegerToken extends BaseToken {
  type = Symbol.for('integer')

  constructor(token: Token) {
    super(token);
  }
}

export class PlusToken extends BaseToken {
  type = Symbol.for('plus');

  constructor(token: Token) {
    super(token);
  }
}

export class MinusToken extends BaseToken {
  type = Symbol.for('minus');

  constructor(token: Token) {
    super(token);
  }
}

export class MultiToken extends BaseToken {
  type = Symbol.for('multi');

  constructor(token: Token) {
    super(token);
  }
}

export class DivideToken extends BaseToken {
  type = Symbol.for('divide');

  constructor(token: Token) {
    super(token)
  }
}

export class LeftParenthesisToken extends BaseToken {
  type = Symbol.for('leftParenthesis');

  constructor(token: Token) {
    super(token);
  }
}

export class RightParenthesisToken extends BaseToken {
  type = Symbol.for('rightParenthesis');

  constructor(token: Token) {
    super(token);
  }
}

export type PossibleToken = IntegerToken | PlusToken | MinusToken | MultiToken | DivideToken | LeftParenthesisToken | DivideToken;
