"use strict";

const { defaultFullBoosterString } = require("./constants");

/**
 * @type {import('postcss').PluginCreator}
 */

function boostSpecificity(opts = {}) {
  // Work with options here

  return {
    postcssPlugin: "postcss-boost-specificity",

    Rule: (rule) => {
      rule.selectors = rule.selectors.map((selector) => {
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
