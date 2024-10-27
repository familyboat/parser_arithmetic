import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "0 123",
  fn() {
    const text = "0 123";
    const context = new Context(text);
    assert.throws(context.parse, `Error: 解析zero过程中出现错误\n0 123\n~`);
  },
});

Deno.test({
  name: "0 +123+",
  fn() {
    const text = "0 +123+";
    const context = new Context(text);
    assert.throws(context.parse, `Error: 解析operator过程中出现错误\n0 ++\n  ~`);
  },
});

Deno.test({
  name: "0 ++",
  fn() {
    const text = "0 ++";
    const context = new Context(text);
    assert.throws(context.parse, `Error: 解析operator过程中出现错误\n0 ++\n  ~`);
  },
});
