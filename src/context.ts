import { die, ID } from "./error.ts";
import { Scanner } from "./scanner.ts";
import { isValidChar } from "./util.ts";

class Context {
  /**
   * 待解析的字符串
   */
  #text: string;
  /**
   * 待解析的字符的索引
   */
  #index: number = 0;
  /**
   * 扫描器
   */
  #scanner: Scanner;
  /**
   * 某个 token 的起始索引
   */
  #startIndex: number | null = null;
  /**
   * 记录扫描是否结束
   */
  #isFinished = false;
  get hasFinished() {
    return this.#isFinished;
  }

  constructor(text: string) {
    this.#text = text;
    this.#scanner = new Scanner(this);
  }

  /**
   * 解析
   */
  parse() {
    this.#scanner.scan();
    return this.#scanner.token;
  }

  /**
   * 开始读取 token，
   * 记录该 token 的起始索引，
   * 并返回当前索引处的字符
   */
  start() {
    this.#startIndex = this.#index;
    return this.getChar();
  }

  /**
   * token 成功读取，
   * 返回 token 的起始索引、结束索引、以及内容
   */
  stop() {
    const start = this.#startIndex;
    if (start === null) throw new Error(`调用${this.stop.name}之前，先调用${this.start.name}`);
    const end = this.#index - 1;
    const content = this.#text.substring(start, end + 1);
    this.#startIndex = null;
    if (end === this.#text.length - 1) {
      this.#isFinished = true;
    }

    return {
      start,
      end,
      content,
    }
  }

  /**
   * 向前移动索引
   */
  forward() {
    if (this.#index >= this.#text.length - 1) {
      this.#index = this.#text.length;
      return false
    }

    this.#index++;
    return true
  }

  /**
   * 获取当前索引处的合法字符
   */
  getChar() {
    const char = this.#text[this.#index];
    if (!isValidChar(char)) {
      die(ID.Invalid);
    }

    return char;
  }
}

export {
  Context
}
