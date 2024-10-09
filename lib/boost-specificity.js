const { singleBoosterString } = require("./constants");
const { isRootLevelSelector } = require("./is-root-level-selector");

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

function boostSpecificity(opts) {
  // Work with options here
  const repeatTimes = opts?.repeatTimes;
  const booster = opts?.booster;

  const repeatTimesNormalized = getNormalizedRepeatTimes(repeatTimes);
  const boosterNormalized = getNormalizedBooster(booster);

  const selectorBooster = boosterNormalized.repeat(repeatTimesNormalized);

  return {
    postcssPlugin: "postcss-boost-specificity",

    Rule: (rule) => {
      rule.selectors = rule.selectors.map((selector) => {
        const rootLevelSelector = isRootLevelSelector(selector);

        if (rootLevelSelector) {
          return `${selector}${selectorBooster}`;
        }

        return `${selectorBooster} ${selector}`;
      });
    },
  };
}

module.exports = boostSpecificity;

module.exports.postcss = true;
