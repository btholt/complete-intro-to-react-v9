---
title: ESLint
description: >-
  Learn how to set up and configure ESLint with Prettier for effective
  JavaScript code linting in your React projects, featuring tools like ESLint's
  JS config and globals package, under the guidance of seasoned developer Brian
  Holt.
keywords:
  - ESLint
  - Prettier
  - JavaScript
  - react
  - Brian Holt
---

On top of Prettier which takes of all the formatting, you may want to enforce some code styles which pertain more to usage: for example you may want to force people to never use `with` which is valid JS but ill advised to use. [ESLint][eslint] comes into play here. It will lint for this problems.

First of all, run `npm install -D eslint@9.9.1 eslint-config-prettier@9.1.0 globals@15.9.0` to install eslint in your project development dependencies. Then you may configure its functionalities.

There are dozens of preset configs for ESLint and you're welcome to use any one of them. The [Airbnb config][airbnb] is very popular, as is the standard config (both of which I taught in previous versions of this class). I'm going to use a looser one for this class: the recommended JS config from ESLint. Let's create an `eslint.config.mjs` file to start linting our project.

> We're using .mjs (module JS) because we want to use import/export for modules instead of require/

Create this file called `eslint.config.mjs`.

```js
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  prettier,
];
```

- ESLint changed a lot with version 9. In previous versions of this course we did used the JSON version of configuration and that's no longer supported; you _have_ to do their newer "flat" version of config (honestly it is better.)
- The `/** @type {import('eslint').Linter.Config[]} */` is a VS Code / TypeScript trick to be able to do autocompletions on the config object. Super helpful to have the types available right in VS Code. It's not required.
- [globals][globals] is a package that is just a big JSON file of what's available in each environment. We're going to be in Node.js and Browser environments so we grabbed those two. If I was being a bit more discerning I'd carefully only apply browser configs to browser files and node configs to Node.js files.
- The config objects are applied in order. We did ESLint's JS config first, and then our custom one so we can overwrite it where we want to, and then the Prettier one should always come last as all it does is turn off rules that Prettier itself does; it doesn't add anything.

This is a combination of the recommended configs of ESLint and Prettier. This will lint for both normal JS stuff as well as JSX stuff. Run `npx eslint` now and you should see we have a few errors. Run it again with the `--fix` flag and see it will fix some of it for us! Go fix the rest of your errors and come back. Let's go add this to our npm scripts.

```json
"lint": "eslint",
```

> 🚨 ESLint will have a bunch of errors right now. Ignore them; we'll fix them in a sec.

Worth adding three things here:

- With npm scripts, you can pass additional parameters to the command if you want. Just add a `--` and then put whatever else you want to tack on after that. For example, if I wanted to get the debug output from ESLint, I could run `npm run lint -- --debug` which would translate to `eslint --debug`.
- We can use our fix trick this way: `npm run lint -- --fix`.
- We're going to both JS and JSX.

ESLint is a cinch to get working with [Visual Studio Code][vscode]. Just download [the extension][vscode-eslint].

## oxlint and Biome

Two projects to watch going forward here: [Biome][biome] (formerly called Rome) and [oxlint][oxlint]. Both are written in Rust and designed to be faster than ESLint (which is written in JavaScript). ESLint at huge scale can be a bit slow and these two projects aim to fix that bottleneck. I'd still say it's early days on these projects and 99% of the time ESLint is fast enough. Still, good to keep an eye on both of the projects. Eventually both projects aim to replace Prettier as well.

[eslint]: https://eslint.org
[vscode-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[airbnb]: https://github.com/airbnb/javascript
[vscode]: https://code.visualstudio.com/
[biome]: https://biomejs.dev/
[oxlint]: https://oxc.rs/docs/guide/usage/linter.html
