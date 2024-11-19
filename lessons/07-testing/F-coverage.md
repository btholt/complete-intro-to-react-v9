---
description: >-
  Learn how to enhance your React test coverage with Vitest and v8 in the
  Complete Intro to React v9 course by Brian Holt. This guide explains setting
  up Chrome's built-in test coverage tool, v8, to visualize code coverage and
  improve your test effectiveness, with alternative support for Istanbul.
  Perfect for React developers aiming to optimize their testing strategies.
title: v8
keywords:
  - React
  - Vitest
  - v8
  - test coverage
  - Brian Holt
  - Istanbul
  - frontend development
---

One last very cool trick that Vitest has built into it: [v8][v8]. v8 uses Chrome's builtin test coverage tool which tells you _how much_ of your code that you're covering with tests. Via an interactive viewer you can see what lines are and aren't covered. This used to be annoying to set up by Vitest just does it for you.

Run the following

```bash
npm i -D @vitest/coverage-v8@2.1.3
```

> You can also use [Istanbul][istanbul] if you want to. `npm i -D @vitest/coverage-istanbul` will get you the package. But I'd say v8 is the superior tool.

Now add this to your `vite.config.js`

```javascript
// inside the test object
coverage: {
  reporter: ["text", "json", "html"],
},
```

Add the following command to your npm scripts: `"coverage": "vitest --coverage"` and go ahead run `npm run coverage` and open the following file in your browser: `open coverage/index.html`.

Here you can see the files we've written tests for. One file, `postContact` is missing two lines of coverage (click on the file name to see that): it's the line of reading back from the cache. It's a file we didn't write a test for but it got covered via our test for the contact page. It's missing a test to cover error cases which could be important. What if our contact API is down? This tool helps you look through your code and see what your tests aren't covering. Some of those could be fine and not worth the effort writing a test for. Others you'll look at and say "oh my god we need to cover that with tests yesterday."

Lastly, add `coverage/` to your `.gitignore` since this shouldn't be checked in.

## Istanbul

v8 use Chrome's built-in code coverage capabilities to run your tests which makes it significantly faster and outputs it in a way that all of [Istanbul][istanbul] tools work with it. You can tell Vitest to use Istanbul but unless you have a very specific reason to, just use v8.

[istanbul]: https://istanbul.js.org/
[c8]: https://github.com/bcoe/c8
[v8]: https://vitest.dev/guide/coverage.html
