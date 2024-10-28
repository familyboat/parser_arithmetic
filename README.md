# 简介

算数解析器——你也可以叫我 coral。

## 主要功能

输入一段文本，对文本进行解析，从文本中解析出合法的四则混合运算式，如果在解析过程中遇到无法识别的 token，会抛出相应的错误。

coral 的功能比较基础。

1. 支持的运算符是加、减、乘、除；
2. 支持的运算数是无符号的整数以及有符号的整数（由一对圆括号进行包裹）；
3. 支持整数 0，但是 0 只能单独存在，即不支持 000 这种表示；其他非 0 整数也不可以有前置的 0，即 087 是无效的表示；

合法的字符集有：+、-、*、/、0、1、2、3、4、5、6、7、8、9、(、) 以及空格。

### 可解析的文本示例

- 1+2+3
- 1 + 2 + 3
- 1+(-2)+(+3)+1*(-4)+4/(-2)
- 0

### 不可解析的文本示例

- 00
- 0++
- 0+
- 0(
- 0 234
- (1)

## 快速开始

使用 [deno](https://deno.land) 运行在线脚本：

```bash
deno run https://jsr.io/@parser/arithmetic/0.1.0/main.ts
```

或者

```bash
deno run https://jsr.io/@parser/arithmetic/0.1.0/main.ts 1+2+3
```

## 使用方法

coral 可以在浏览器环境、node.js 环境、deno 环境、bun 环境下运行。

使用前执行下列命令安装 coral：

```bash
# node.js
npx jsr add @parser/arithmetic

# deno
deno add jsr:@parser/arithmetic

# bun
bunx jsr add @parser/arithmetic
```

在你的项目中导入 coral，并解析文本：

```ts
import * as Parser from "@parser/arithmetic";

const text = "1+2+3";
const context = new Parser.Context(text);

try {
  // 得到 ast
  const ast = context.parseAst();
  // 打印 ast
  console.log(JSON.stringify(ast));
  // 得到结果
  const result = ast?.evaluate();
  // 对 ast 进行格式化
  const pretty = ast?.pretty();
  // 打印结果
  console.log(`输入：${text}`);
  console.log(`输出：${pretty} = ${result}`);
} catch (error: unknown) {
  console.log(`${error}`);
}
```

## 开发路线

- 新特性：添加圆括号表达式，即支持类似 (1+2+3)+4 的形式

## 如何贡献

- 在使用过程中，发现任何的 bug，欢迎提 issue；
- 想要添加新的特性，也欢迎提 PR；
- 完善文档和测试用例；
- 优化性能；

## 鸣谢

- 感谢 [jsonc-parser](https://github.com/dprint/jsonc-parser)。token 解析的实现思路受其启发。
