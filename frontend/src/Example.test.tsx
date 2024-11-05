import { expect, test } from "vitest";
// This file serves as an example of running tests in vitest. It is to be removed in the future
// Please refer to the vitest documentation here: https://vitest.dev/
// NOTE: your test file MUST end with ".test.ts" or ".test.tsx"

function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
