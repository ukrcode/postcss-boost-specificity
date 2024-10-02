"module exports";

const singleBoosterString = `:not(#\\9)`;
const defaultFullBoosterString = `${singleBoosterString}${singleBoosterString}${singleBoosterString}`;

module.exports = { singleBoosterString, defaultFullBoosterString };
