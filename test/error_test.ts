import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0 123",
  fn() {
    const text = "0 123";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "0 +123+",
  fn() {
    const text = "0 +123+";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "0 ++",
  fn() {
    const text = "0 ++";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});
