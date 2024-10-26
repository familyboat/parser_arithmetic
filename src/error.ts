// deno-lint-ignore-file no-fallthrough
/**
 * 默认错误信息
 */
function dieDefault(): never {
  throw new Error('解析出错');
}

/**
 * 解析到非法字符
 */
function dieInvalid(): never {
  throw new Error('解析到非法字符');
}

/**
 * 解析 0 出错
 */
function dieZero(): never {
  throw new Error('解析 0 出错');
}

/**
 * 解析非 0 的数字出错
 */
function dieNonZero(): never {
  throw new Error('解析非 0 出错');
}

/**
 * 解析运算符出错
 */
function dieOperator(): never {
  throw new Error('解析运算符出错');
}

/**
 * 解析左圆括号出错
 */
function dieLeftParenthesis(): never {
  throw new Error('解析左圆括号出错');
}

/**
 * 解析右圆括号出错
 */
function dieRightParenthesis(): never {
  throw new Error('解析右圆括号出错');
}

export enum ID {
  Default,
  Invalid,
  Zero,
  NonZero,
  Operator,
  LeftParenthesis,
  RightParenthesis,
}

export function die(id: ID): never {
  switch (id) {
    case ID.Invalid:
      dieInvalid();
    case ID.Zero:
      dieZero();
    case ID.NonZero:
      dieNonZero();
    case ID.Operator:
      dieOperator();
    case ID.LeftParenthesis:
      dieLeftParenthesis();
    case ID.RightParenthesis:
      dieRightParenthesis();
    default:
      dieDefault();
  }
}
