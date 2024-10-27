import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0/1",
  fn() {
    const text = "0/1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "50/2",
  fn() {
    const text = "50/2";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 25);
  },
});

Deno.test({
  name: "50/0",
  fn() {
    const text = "50/0";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, Infinity);
  },
});
