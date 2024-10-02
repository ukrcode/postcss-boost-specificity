"use strict";

const postcss = require("postcss");
const plugin = require("../lib/boost-specificity");
const { classSelector, classSelectorExpected } = require("./mocks");

const { minifyCss } = require("./minify-css");
const { runPostcssPlugin } = require("./run-postcss-plugin");

describe("postcss-boost-specificity", () => {
  it("should work with classes `.batman`", async () => {
    const result = await runPostcssPlugin(plugin, classSelector);

    expect(result).toBe(minifyCss(classSelectorExpected));
  });
});
