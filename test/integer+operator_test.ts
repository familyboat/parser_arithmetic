import { Context } from "../src/context.ts";

Deno.test({
  name: '0+0',
  fn() {
    const text = '0+0';
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '0-0',
  fn() {
    const text = '0-0';
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '0*0',
  fn() {
    const text = '0*0';
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '0/0',
  fn() {
    const text = '0/0';
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '0 + 0',
  fn() {
    const text = '0 + 0';
    const context = new Context(text);
    console.log(context.parse())
  }
})