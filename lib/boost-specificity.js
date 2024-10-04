"use strict";

const {
  defaultFullBoosterString,
  singleBoosterString,
} = require("./constants");

const rootLevelSelectors = ["html", singleBoosterString, ":host", ":root"];

const defaultRepeatTimes = 3;
const defaultBooster = singleBoosterString;

function getNormalizedBooster(booster) {
  if (typeof booster !== "string") {
    return defaultBooster;
  }

  return booster?.trim() || defaultBooster;
}

function getNormalizedRepeatTimes(repeatTimes) {
  if (typeof repeatTimes !== "number" || !isFinite(repeatTimes)) {
    return defaultRepeatTimes;
  }

  return repeatTimes || defaultRepeatTimes;
}

function boostSpecificity(opts = { repeatTimes: 3 }) {
  // Work with options here
  const { repeatTimes, booster } = opts;
  const repeatTimesNormalized = getNormalizedRepeatTimes(repeatTimes);
  const boosterNormalized = getNormalizedBooster(booster);

  const selectorBooster = boosterNormalized.repeat(repeatTimesNormalized)

  return {
    postcssPlugin: "postcss-boost-specificity",

    Rule: (rule) => {
      rule.selectors = rule.selectors.map((selector) => {
        const isRootLevelSelector = rootLevelSelectors.includes(selector);

        if (isRootLevelSelector) {
          return `${selector}${selectorBooster}`;
        }

        return `${selectorBooster} ${selector}`;
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
