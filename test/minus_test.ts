import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0-1",
  fn() {
    const text = "0-1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -1);
  },
});

Deno.test({
  name: "89-0-1",
  fn() {
    const text = "89-0-1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 88);
  },
});
