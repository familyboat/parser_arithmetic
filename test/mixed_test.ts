import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "1+2-3",
  fn() {
    const text = "1+2-3";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "3*4/2/3",
  fn() {
    const text = "3*4/2/3";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 2);
  },
});

Deno.test({
  name: "4/2*3",
  fn() {
    const text = "4/2*3";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 6);
  },
});
