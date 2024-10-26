/**
 * 是否为合法字符
 */
export function isValidChar(char: string) {
  return isInteger(char) || isBlank(char) || isOperator(char) || isLeftParenthesis(char) || isRightParenthesis(char)
}

/**
 * 是否为运算符
 */
export function isOperator(char: string) {
  return isPlusOrMinus(char) || isMultiOrDivide(char);
}

/**
 * 是否为 + -，
 */
export function isPlusOrMinus(char: string) {
  return '+,-'.split(',').includes(char);
}

/**
 * 是否为 * /
 */
export function isMultiOrDivide(char: string) {
  return '*,/'.split(',').includes(char);
}

/**
 * 是否为 0
 */
export function isZero(char: string) {
  return char === '0'
}

/**
 * 是否为 1-9
 */
export function isNonZero(char: string) {
  return '1,2,3,4,5,6,7,8,9'.split(',').includes(char);
}

/**
 * 是否为 0-9
 */
export function isInteger(char: string) {
  return isZero(char) || isNonZero(char);
}

/**
 * 是否为空格
 */
export function isBlank(char: string) {
  return char === ' ';
}

/**
 * 是否为左圆括号
 */
export function isLeftParenthesis(char: string) {
  return char === '('
}

/**
 * 是否为右圆括号
 */
export function isRightParenthesis(char: string) {
  return char === ')'
}
