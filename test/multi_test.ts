import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0*1",
  fn() {
    const text = "0*1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "2*3*45",
  fn() {
    const text = "2*3*45";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 270);
  },
});
