import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "1-3*1/5",
  fn() {
    const text = "1-3*1/5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0.4);
  },
});

Deno.test({
  name: "1-3*1/4/5",
  fn() {
    const text = "1-3*1/4/5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0.85);
  },
});

Deno.test({
  name: "1-3*1/4/5+1",
  fn() {
    const text = "1-3*1/4/5+1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1.85);
  },
});

Deno.test({
  name: "1-1/4/5*2*5*2+1",
  fn() {
    const text = "1-1/4/5*2*5*2+1";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1);
  },
});
