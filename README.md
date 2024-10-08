# postcss-boost-specificity

## [Changelog](./CHANGELOG.md)

Documentation in [🇺🇦 ukrainean](./README_uk.md)

[PostCSS](https://github.com/postcss/postcss) plugin to boost(increase) the specificity of your selectors.

It is hugely inspired by [MadLittleMods/postcss-increase-specificity](https://github.com/MadLittleMods/postcss-increase-specificity) but it is not a copy, it has different API and the code is written from scratch.

The reason I created it was, that initial plugin is not supported by the author and uses outdated dependencies.

## Install

```bash
npm install -D postcss-boost-specificity
```

## How does it work?

Basically it adds additional selector to each of your selectors to improve their weight.

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
```

- By default it uses `:not(#\9)` selector and adds it to your selector. But you can provide your own substitute. Here you can find all the discussion related to it [What is the most character-efficient way to increase CSS specificity?](https://stackoverflow.com/questions/19399625/what-is-the-most-character-efficient-way-to-increase-css-specificity)

## Demo

We prepared a Demo you can run locally. Just don't forget running `npm install` beforehand.

- All the code for it is inside `demo/index.js` file.
- It takes CSS code from `demo/test.css` file, process it and puts results to the `demo/results/test.result.css` file.
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
- `repeatTimes`: a number, it says how many times to repeat `options.booster` for your selectors
  - the default value is: `3`
  - `NaN`, `Infinity`, `-Infinity` values are ignored, the default value is used instead;
    ```js
    let badRepeatTimes1 = NaN;
    let badRepeatTimes2 = Infinity;
    let badRepeatTimes3 = -Infinity;
    // These values are ignored
    ```

## Scripts

- `npm test`: single tests run
- `npm run test:watch`: test run in a "watch" mode
- `npm run demo`: demo run

## Contribution
