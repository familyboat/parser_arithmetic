import { strict as assert } from "node:assert";
import { Context } from "../src/context.ts";

Deno.test({
  name: "(+0)",
  fn() {
    const text = "(+0)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 0);
  },
});

Deno.test({
  name: "(+1)",
  fn() {
    const text = "(+1)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 1);
  },
});

Deno.test({
  name: "(-0)",
  fn() {
    const text = "(-0)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -0);
  },
});

Deno.test({
  name: "(-1)",
  fn() {
    const text = "(-1)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -1);
  },
});

Deno.test({
  name: "(-124)",
  fn() {
    const text = "(-124)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, -124);
  },
});

Deno.test({
  name: "(+234)",
  fn() {
    const text = "(+234)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 234);
  },
});

Deno.test({
  name: "( +234  )",
  fn() {
    const text = "( +234  )";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 234);
  },
});

Deno.test({
  name: "1+(+23)+1+(-22)+1*(+2)+2/(-1)",
  fn() {
    const text = "1+(+23)+1+(-22)+1*(+2)+2/(-1)";
    const context = new Context(text);
    const result = context.parse();
    assert.equal(result, 3);
  },
});
