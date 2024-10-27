import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "1+2-3*5",
  fn() {
    const text = "1+2-3*5";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -12);
  },
});
