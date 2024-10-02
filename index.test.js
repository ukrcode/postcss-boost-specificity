import { describe, it, expect } from "vitest";
import plugin from "./index";

// https://github.com/postcss/postcss/issues/1771#issuecomment-2007313545

describe("postcss-boost-specificity", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  async function runPlugin(input, output, opts = {}) {
    return await postcss([plugin(opts)]).process(input, { from: undefined })
  }
});
