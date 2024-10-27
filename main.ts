import { Context } from "./src/context.ts";

if (import.meta.main) {
  const text = "1  / 2 - 3 * 4  + 5";
  const ast = new Context(text).parseAst();
  const pretty = ast?.pretty();
  const result = ast?.evaluate();
  console.log(`输入是：${text}`);
  console.log(`输出是：${pretty} = ${result}`);
}
