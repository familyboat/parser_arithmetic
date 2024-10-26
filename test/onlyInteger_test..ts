import { Context } from "../src/context.ts";

Deno.test({
  name: '0',
  fn() {
    const text = '0'
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '1',
  fn() {
    const text = '1'
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '12321',
  fn() {
    const text = '12321'
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: ' 12321 ',
  fn() {
    const text = ' 12321 '
    const context = new Context(text);
    console.log(context.parse())
  }
})

Deno.test({
  name: '123 21',
  fn() {
    const text = '123 21'
    const context = new Context(text);
    console.log(context.parse())
  }
})
