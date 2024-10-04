"use strict";

const plugin = require("../lib/boost-specificity");
const { defaultFullBoosterString } = require("../lib/constants");

const { minifyCss } = require("./minify-css");
const { runPostcssPlugin } = require("./run-postcss-plugin");

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
