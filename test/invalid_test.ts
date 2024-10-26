import { Context } from "../src/context.ts";

Deno.test({
  name: '%',
  fn() {
    try {
      const text = '%';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '00',
  fn() {
    try {
      const text = '00';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '0(',
  fn() {
    try {
      const text = '00';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '1(',
  fn() {
    try {
      const text = '1(';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '++',
  fn() {
    try {
      const text = '++';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '1+2+',
  fn() {
    try {
      const text = '1+2+';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '()',
  fn() {
    try {
      const text = '()';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '(*',
  fn() {
    try {
      const text = '(*';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '(+',
  fn() {
    try {
      const text = '(+';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: '(',
  fn() {
    try {
      const text = '(';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: ')(',
  fn() {
    try {
      const text = ')(';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})

Deno.test({
  name: ')0',
  fn() {
    try {
      const text = ')0';
      const context = new Context(text);
      context.parse();
    } catch (error: unknown) {
      console.log(error);
    }
  }
})
