![The latest CI run for main branch](https://github.com/ukrcode/postcss-boost-specificity/actions/workflows/ci.yml/badge.svg?event=push&branch=main) ![npm version](https://img.shields.io/npm/v/postcss-boost-specificity)

# 🇺🇦 postcss-boost-specificity

- The version in [🇺🇦 ukrainean](./uk/README_uk.md)
- [CI runs log for the "main" branch](https://github.com/ukrcode/postcss-boost-specificity/actions/workflows/ci.yml?query=branch%3Amain)

## Description

[PostCSS](https://github.com/postcss/postcss) plugin to boost (increase) the specificity of CSS selectors.

It is hugely inspired by [MadLittleMods/postcss-increase-specificity](https://github.com/MadLittleMods/postcss-increase-specificity) but it is not a copy, it has a different API and the code is written from scratch.

The reason I created it was that the author does not support the initial plugin and it uses outdated dependencies.

## Usage

```bash
npm install -D postcss-boost-specificity
```

After that please, add the plugin to your `postcss` configuration file or use it when you call `postcss`.

## How does it work?

Basically, it adds an additional selector to each of the existing selectors to improve their weight.

**Initial CSS:**

```css
html {
  background: #bada55;
}

.batman {
  background: #fff;
}

#main-hero {
  color: red;
}

[id="main-hero"] {
  text-transform: uppercase;
}

html[data-whatintent="keyboard"] .button:focus {
  background-color: #bada55;
}
```

**Result CSS:**

```css
html:not(#\9):not(#\9):not(#\9) {
  background: #bada55;
}

:not(#\9):not(#\9):not(#\9) .batman {
  background: #fff;
}

:not(#\9):not(#\9):not(#\9) #main-hero {
  color: red;
}

:not(#\9):not(#\9):not(#\9) [id="main-hero"] {
  text-transform: uppercase;
}

html[data-whatintent="keyboard"] .button:focus:not(#\9):not(#\9):not(#\9) {
  background-color: #bada55;
}
```

- By default it uses `:not(#\9)` selector and adds it to your selector. But you can provide your substitute. Here you can find all the discussion related to it [What is the most character-efficient way to increase CSS specificity?](https://stackoverflow.com/questions/19399625/what-is-the-most-character-efficient-way-to-increase-css-specificity)

## Demo

We prepared a Demo you can run locally. Just don't forget to run `npm install` beforehand.

- All the code for it is inside `demo/index.js` file.
- It takes CSS code from `demo/test.css` file, processes it, and puts results to the `demo/results/test.result.css` file.
- `npm run demo` script runs this demo
- `demo/results/test.result.css` is in `.gitignore`, so you can generate it by yourself.

## Options

- `booster`: a string, CSS selector to `prepend` (`append` for root selectors like `html, :root, :host`) to each of your selectors.

  - the default value is: `:not(#\9)`. It increases specificity by `id` for each repeated time.
    - _Warning_: The default value is `:not(#\9)` pseudo-class selector is not supported in `IE` browsers. If it is an issue for you, please provide the substitute.
  - An empty string or a string only from spaces are ignored, the default value is used instead;
    ```js
    let badBooster1 = "";
    let badBooster2 = "     "; // These values are ignored
    ```

- `repeatTimes`: a number, that says how many times to repeat `options.booster` for your selectors
  - the default value is: `3`
  - `NaN`, `Infinity`, and `-Infinity` values are ignored, the default value is used instead;
    ```js
    let badRepeatTimes1 = NaN;
    let badRepeatTimes2 = Infinity;
    let badRepeatTimes3 = -Infinity;
    // These values are ignored
    ```

## Contributing

To be able to contribute you may require to do some local setup.

### Local Setup

0. Fork the project under your own `GitHub` account.
1. Clone the project.
2. You must have [Node.js and NPM](https://nodejs.org/en) installed locally.
3. Run the `npm install` command in the project folder.

After the setup please follow the instructions from the [contributing guide](./CONTRIBUTING.md).

Also, please check up on our awesome `NPM scripts` below.

## Scripts

- `npm test`: run tests
- `npm run lint`: run `ESLint` check of the code
- `npm run test:watch`: run tests in a "watch" mode
- `npm run demo`: run demo example
- `npm run npm:publish:beta`: publish the package to NPM registry with the `beta` tag

## [Changelog](./CHANGELOG.md)
