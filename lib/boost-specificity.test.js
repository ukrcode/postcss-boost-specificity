"use strict";

const plugin = require("./boost-specificity.js");

describe("postcss-boost-specificity", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  async function runPlugin(input, opts = {}) {
    return await postcss([plugin(opts)]).process(input, { from: undefined })
  }
});
