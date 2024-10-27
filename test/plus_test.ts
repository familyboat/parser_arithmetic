import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0",
  fn() {
    const text = "0";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "1",
  fn() {
    const text = "1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1);
  },
});

Deno.test({
  name: "124",
  fn() {
    const text = "124";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 124);
  },
});

Deno.test({
  name: "1+1",
  fn() {
    const text = "1+1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 2);
  },
});

Deno.test({
  name: "1+1+234",
  fn() {
    const text = "1+1+234";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 236);
  },
});

Deno.test({
  name: "1 + 1 + 234",
  fn() {
    const text = "1 + 1 + 234";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 236);
  },
});
