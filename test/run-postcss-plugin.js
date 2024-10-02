"use strict";

const postcss = require("postcss");

const { minifyCss } = require("./minify-css");

async function runPostcssPlugin(plugin, input, opts = {}) {
  const runResult = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });

  return minifyCss(runResult.css);
}

module.exports = { runPostcssPlugin };
