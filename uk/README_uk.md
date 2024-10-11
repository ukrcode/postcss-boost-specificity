![The latest CI run for main branch](https://github.com/ukrcode/postcss-boost-specificity/actions/workflows/ci.yml/badge.svg?event=push&branch=main) ![npm version](https://badge.fury.io/js/postcss-boost-specificity.svg)

# 🇺🇦 postcss-boost-specificity

- Версія англійською мовою: [🇬🇧 english](../README.md)
- [Журнал запусків CI перевірок для гілки "main"](https://github.com/ukrcode/postcss-boost-specificity/actions/workflows/ci.yml?query=branch%3Amain)

## Опис

Плагін [PostCSS](https://github.com/postcss/postcss) для збільшення специфічності CSS-селекторів.

Я надихався [MadLittleMods/postcss-increase-specificity](https://github.com/MadLittleMods/postcss-increase-specificity), але це не копія, у нього інший API і код написаний з нуля.

Причина, через яку я його створив, полягає в тому, що автор більше не підтримує початковий плагін, і він використовує застарілі залежності.

## Використання

```bash
npm install -D postcss-boost-specificity
```

Після цього додайте плагін у ваш конфігураційний файл `postcss` або використовуйте його при виклику `postcss`.

## Як це працює?

Цей плагін додає додатковий селектор до кожного існуючого селектора для збільшення їхньої ваги.

**Початковий CSS:**

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

**Результат:**

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

- Типово він використовує селектор `:not(#\9)` і додає його до вашого селектора, але ви можете надати свій замінник. Тут ви можете знайти всі обговорення з цього приводу [What is the most character-efficient way to increase CSS specificity?](https://stackoverflow.com/questions/19399625/what-is-the-most-character-efficient-way-to-increase-css-specificity)

## Демо

Ми підготували демо, яке ви можете запустити локально. Просто не забудьте спочатку запустити команду `npm install`.

- Весь код для цього знаходиться у файлі `demo/index.js`.
- Він бере CSS-код з файлу `demo/test.css`, обробляє його і записує результати у файл `demo/results/test.result.css`.
- Скрипт `npm run demo` запускає цей процес.
- Файл `demo/results/test.result.css` знаходиться у `.gitignore`, тому ви можете згенерувати його самостійно, використавши свій CSS код.

## Options

- `booster`: рядок, CSS-селектор для `prepend` (або `append` для кореневих селекторів, як `html, :root, :host`) до кожного вашого селектора.

  - типове значення: `:not(#\9)`. Він збільшує специфічність за допомогою `id` кожен раз при повторенні.
    - _Попередження_: Типове значення псевдоклас `:not(#\9)` не підтримується в браузерах `IE`. Якщо це проблема для вас, надайте замінник.
  - Порожній рядок або рядок, що складається тільки з пробілів, ігноруються, використовується типове значення:
    ```js
    let badBooster1 = "";
    let badBooster2 = "     "; // Ці значення ігноруються
    ```

- `repeatTimes`: число, що вказує, скільки разів повторювати `options.booster` для ваших селекторів.
  - Типове значення: `3`
  - значення `NaN`, `Infinity`, і `-Infinity` ігноруються, замість них використовується типове значення:
    ```js
    let badRepeatTimes1 = NaN;
    let badRepeatTimes2 = Infinity;
    let badRepeatTimes3 = -Infinity;
    // Ці значення ігноруються
    ```

## Contributing

Щоб мати можливість вносити зміни, вам може знадобитися зробити деякі локальні налаштування.

### Локальні налаштування

0. Форкніть проєкт у свій власний обліковий запис `GitHub`.
1. Клонуйте проєкт.
2. У вас повинні бути встановлені локально [Node.js та NPM](https://nodejs.org/en).
3. Виконайте команду `npm install` у папці проєкту.

Після налаштування, будь ласка, дотримуйтесь інструкцій з [CONTRIBUTING](./CONTRIBUTING_uk.md).

Також не забудьте перевірити наші чудові `NPM скрипти` нижче.

## Скрипти

- `npm test`: запуск тестів
- `npm run lint`: перевірка коду за допомогою `ESLint`
- `npm run test:watch`: запуск тестів у режимі "watch"
- `npm run demo`: запуск демо прикладу
- `npm run npm:publish:beta`: публікація пакету в реєстр NPM з тегом `beta`

## [Changelog](./CHANGELOG.md)
