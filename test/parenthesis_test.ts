import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "(1+2)",
  fn() {
    const text = "(1+2)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 3);
  },
});

Deno.test({
  name: "((1+2))",
  fn() {
    const text = "((1+2))";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 3);
  },
});

Deno.test({
  name: "(((1+2)))",
  fn() {
    const text = "(((1+2)))";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 3);
  },
});

Deno.test({
  name: "(((1+2)+1))",
  fn() {
    const text = "(((1+2)+1))";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 4);
  },
});

Deno.test({
  name: "(((1+2)+1)*4)",
  fn() {
    const text = "(((1+2)+1)*4)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 16);
  },
});

Deno.test({
  name: "(((1+2)+1)*4/5)",
  fn() {
    const text = "(((1+2)+1)*4/5)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 3.2);
  },
});

Deno.test({
  name: "(1/2)+(1/2)",
  fn() {
    const text = "(1/2)+(1/2)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1);
  },
});

Deno.test({
  name: "1+(2-3)*4+(5-6*7)+8-9",
  fn() {
    const text = "1+(2-3)*4+(5-6*7)+8-9";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -41);
  },
});

Deno.test({
  name: "1+(2-3*4)+(5-6*7)+8-9",
  fn() {
    const text = "1+(2-3*4)+(5-6*7)+8-9";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -47);
  },
});

Deno.test({
  name: "(1-3)*1/5",
  fn() {
    const text = "(1-3)*1/5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -0.4);
  },
});

Deno.test({
  name: "(1-3+4)*1/5",
  fn() {
    const text = "(1-3+4)*1/5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0.4);
  },
});

Deno.test({
  name: "(1-3+4)*1/5",
  fn() {
    const text = "(1-3+4)*1/5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0.4);
  },
});
