import { strict as assert } from "node:assert";
import { compareOperatorLevel } from "../src/context.ts";
import type { OperatorTokenKind } from "../src/token.ts";
import { Range } from "../src/token.ts";
import { MinusToken } from "../src/token.ts";
import { PlusToken } from "../src/token.ts";
import { MultiToken } from "../src/token.ts";
import { DivideToken } from "../src/token.ts";

Deno.test({
  name: "compare operator level",
  fn() {
    const range = new Range(-1, -1);
    const minus = new MinusToken(range);
    const plus = new PlusToken(range);
    const multi = new MultiToken(range);
    const divide = new DivideToken(range);

    const sutes: Array<{
      a: OperatorTokenKind;
      b: OperatorTokenKind;
      expect: boolean;
    }> = [
      {
        a: minus,
        b: minus,
        expect: true,
      },
      {
        a: minus,
        b: plus,
        expect: true,
      },
      {
        a: minus,
        b: multi,
        expect: false,
      },
      {
        a: minus,
        b: divide,
        expect: false,
      },
      {
        a: plus,
        b: minus,
        expect: true,
      },
      {
        a: plus,
        b: plus,
        expect: true,
      },
      {
        a: plus,
        b: multi,
        expect: false,
      },
      {
        a: plus,
        b: divide,
        expect: false,
      },
      {
        a: multi,
        b: minus,
        expect: true,
      },
      {
        a: multi,
        b: plus,
        expect: true,
      },
      {
        a: multi,
        b: multi,
        expect: true,
      },
      {
        a: multi,
        b: divide,
        expect: true,
      },
      {
        a: divide,
        b: minus,
        expect: true,
      },
      {
        a: divide,
        b: plus,
        expect: true,
      },
      {
        a: divide,
        b: multi,
        expect: true,
      },
      {
        a: divide,
        b: divide,
        expect: true,
      },
    ];

    for (const { a, b, expect } of sutes) {
      assert.equal(compareOperatorLevel(a, b), expect);
    }
  },
});
