const { createParser } = require("css-selector-parser");
const { singleBoosterString } = require("./constants");
const parse = createParser();

const basicRootLevelSelectors = [singleBoosterString, ":host", ":root"];

const tagNameType = "TagName";
const htmlTag = "html";

function getParsedSelectorItems(selector) {
  const parsedSelector = parse(selector);
  const rule = parsedSelector.rules[0];

  return rule?.items || [];
}

function isHtmlSelector(selector) {
  if (selector === htmlTag) {
    return true;
  }

  if (!selector.includes(htmlTag)) {
    return false;
  }

  const ruleItems = getParsedSelectorItems(selector);

  return ruleItems.some(
    ({ type, name }) => type === tagNameType && name === htmlTag
  );
}

function isRootLevelSelector(selector) {
  return basicRootLevelSelectors.includes(selector) || isHtmlSelector(selector);
}

module.exports = { isRootLevelSelector };
