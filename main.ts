import { Context } from "./src/context.ts";

if (import.meta.main) {
  const text = Deno.args[0] || "1+2";

  const help = `算数解析器，支持加减乘除四种运算，支持无符号的整数，支持有符号的整数（需包裹在圆括号内）\n示例：1+(-2)-3*(+4)+5/(-1)`
  
  try {
    const ast = new Context(text).parseAst();
    const pretty = ast?.pretty();
    const result = ast?.evaluate();
    console.log(`输入是：${text}`);
    console.log(`输出是：${pretty} = ${result}`);
  } catch (error: unknown) {
    console.log(`${error}`);
    console.log(help);
  }
}
