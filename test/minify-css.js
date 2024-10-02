"use strict";

const CleanCss = require("clean-css");

const cleanCssProcessor = new CleanCss({
  /*
    Options WIP
    */
});

const minifyCss = (cssString) => {
  return cleanCssProcessor.minify(cssString).styles;
}

module.exports = { minifyCss };
