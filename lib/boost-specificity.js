"use strict";

const {
  defaultFullBoosterString,
  singleBoosterString,
} = require("./constants");

/**
 * @type {import('postcss').PluginCreator}
 */

const rootLevelSelectors = ["html", singleBoosterString, ":host", ":root"];

function boostSpecificity(opts = {}) {
  // Work with options here

  return {
    postcssPlugin: "postcss-boost-specificity",

    Rule: (rule) => {
      rule.selectors = rule.selectors.map((selector) => {
        const isRootLevelSelector = rootLevelSelectors.includes(selector);

        if (isRootLevelSelector) {
          return `${selector}${defaultFullBoosterString}`;
        }

        return `${defaultFullBoosterString} ${selector}`;
      });
    },
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
}

module.exports = boostSpecificity;

module.exports.postcss = true;
