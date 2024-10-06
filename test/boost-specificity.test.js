"use strict";

const plugin = require("../lib/boost-specificity");
const {
  singleBoosterString,
} = require("../lib/constants");

const { minifyCss } = require("./minify-css");
const { runPostcssPlugin } = require("./run-postcss-plugin");

const defaultFullBoosterString = singleBoosterString.repeat(3);

describe("postcss-boost-specificity", () => {
  it("should work with single class `.batman`", async () => {
    const cssCode = `
      .batman {
          background: #bada55;
      }
    `;

    const expectedResult = `
        ${defaultFullBoosterString} .batman {
            background: #bada55;
        }
    `;

    const result = await runPostcssPlugin(plugin, cssCode);

    expect(result).toBe(minifyCss(expectedResult));
  });

  it("should work classes selector divided by coma `.batman, .robin`", async () => {
    const cssCode = `
      .batman, .robin {
          color: red; 
      }
    `;

    const expectedResult = `
      ${defaultFullBoosterString} .batman, ${defaultFullBoosterString} .robin {
          color: red; 
      }
    `;

    const result = await runPostcssPlugin(plugin, cssCode);

    expect(result).toBe(minifyCss(expectedResult));
  });

  it("should work with id selector `#joker`", async () => {
    const cssCode = `
      #joker {
          color: red; 
      }
    `;

    const expectedResult = `
      ${defaultFullBoosterString} #joker {
          color: red; 
      }
    `;

    const result = await runPostcssPlugin(plugin, cssCode);

    expect(result).toBe(minifyCss(expectedResult));
  });

  it('should work with id attribute selector `[id="joker"]` or [id^="bane"]', async () => {
    const cssCode = `
      [id="joker"] {
        background-color: #bada55;
      }

      [id^="bane"] {
        background-color: #bada55;
      }
    `;

    const expectedResult = `
      ${defaultFullBoosterString} [id="joker"] {
        background-color: #bada55;
      }

      ${defaultFullBoosterString} [id^="bane"] {
        background-color: #bada55;
      }
    `;

    const result = await runPostcssPlugin(plugin, cssCode);

    expect(result).toBe(minifyCss(expectedResult));
  });

  describe("root level selector", () => {
    it("should work `html` selector", async () => {
      const cssCode = `
        html {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        html${defaultFullBoosterString} {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode);

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should work `:not(#\\9)` selector", async () => {
      const cssCode = `
        :not(#\\9) {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        :not(#\\9)${defaultFullBoosterString} {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode);

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should work `:host` selector", async () => {
      const cssCode = `
        :host {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        :host${defaultFullBoosterString} {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode);

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should work `:root` selector", async () => {
      const cssCode = `
        :root {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        :root${defaultFullBoosterString} {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode);

      expect(result).toBe(minifyCss(expectedResult));
    });

    it.only("should work with complext html selector", async () => {
      // html[data-whatintent=keyboard] .button:focus {}
      const cssCode = `
        html[data-whatintent=keyboard] .button:focus {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        html[data-whatintent=keyboard]${defaultFullBoosterString} .button:focus {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode);

      expect(result).toBe(minifyCss(expectedResult));
    });
  });

  describe("options", () => {
    it("should respect `repeatTimes` option for regular selector", async () => {
      const cssCode = `
        .batman {
            background: #bada55;
        }
      `;

      const expectedResult = `
          ${singleBoosterString}${singleBoosterString} .batman {
              background: #bada55;
          }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        repeatTimes: 2,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should respect `repeatTimes` option for root(`html`) selector", async () => {
      const cssCode = `
        html {
          background-color: #bada55;
        }
      `;

      const expectedResult = `
        html${singleBoosterString}${singleBoosterString} {
          background-color: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        repeatTimes: 2,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should use `booster` string from options", async () => {
      const booster = ".my-cool-class-wrapper";
      const cssCode = `
        .batman {
            background: #bada55;
        }
      `;

      const expectedResult = `
          .my-cool-class-wrapper.my-cool-class-wrapper.my-cool-class-wrapper  .batman {
              background: #bada55;
          }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        booster,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should NOT use an empty string for `booster` from options", async () => {
      const booster = "    ";
      const cssCode = `
        .batman {
            background: #bada55;
        }
      `;

      const expectedResult = `
          ${singleBoosterString}${singleBoosterString}${singleBoosterString} .batman {
              background: #bada55;
          }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        booster,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should combine `booster` and `repeatTimes` from options", async () => {
      const booster = ".my-cool-class-wrapper";
      const cssCode = `
        .batman {
            background: #bada55;
        }
      `;

      const expectedResult = `
          .my-cool-class-wrapper .batman {
              background: #bada55;
          }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        booster,
        repeatTimes: 1,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should ignore `booster` and `repeatTimes` from options if wrong data types", async () => {
      const cssCode = `
        .batman {
              background: #bada55;
        }
      `;

      const expectedResult = `
        ${defaultFullBoosterString} .batman {
            background: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        booster: [],
        repeatTimes: {},
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should ignore NaN as `repeatTimes`", async () => {
      const cssCode = `
        .batman {
              background: #bada55;
        }
      `;

      const expectedResult = `
        ${defaultFullBoosterString} .batman {
            background: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        repeatTimes: NaN,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should ignore Infinity as `repeatTimes`", async () => {
      const cssCode = `
        .batman {
              background: #bada55;
        }
      `;

      const expectedResult = `
        ${defaultFullBoosterString} .batman {
            background: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        repeatTimes: Infinity,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });

    it("should ignore -Infinity as `repeatTimes`", async () => {
      const cssCode = `
        .batman {
              background: #bada55;
        }
      `;

      const expectedResult = `
        ${defaultFullBoosterString} .batman {
            background: #bada55;
        }
      `;

      const result = await runPostcssPlugin(plugin, cssCode, {
        repeatTimes: -Infinity,
      });

      expect(result).toBe(minifyCss(expectedResult));
    });
  });

  it("should work with `::selection`", async () => {
    const cssCode = `
        ::selection {
          background-color: #bada55;
        }
      `;

    const expectedResult = `
        ${defaultFullBoosterString} ::selection {
          background-color: #bada55;
        }
      `;

    const result = await runPostcssPlugin(plugin, cssCode);

    expect(result).toBe(minifyCss(expectedResult));
  });
});
