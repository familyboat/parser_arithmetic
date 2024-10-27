import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.bench({
    name: "1+${'2*3-12/2+'.repeat(1000)}0",
  fn() {
    const text = `1+${'2*3-12/2+'.repeat(2000)}0`;
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1);
  },
})