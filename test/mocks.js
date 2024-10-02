const { defaultFullBoosterString } = require("../lib/constants");

const classSelector = `
    .batman {
        background: #bada55;
    }
`;

const classSelectorExpected = `
    ${defaultFullBoosterString} .batman {
        background: #bada55;
    }
`;

module.exports = {
  classSelector,
  classSelectorExpected,
};
