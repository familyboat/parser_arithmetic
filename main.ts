import { Context } from "./src/context.ts";

if (import.meta.main) {
  const text = '1+2-3*4/5';
  const ast = new Context(text).parseAst();
  console.log(JSON.stringify(ast, null, 2));
}