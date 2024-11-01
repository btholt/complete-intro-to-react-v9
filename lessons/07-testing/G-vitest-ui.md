---
title: Vitest UI
description: >-
  Learn how to use Vitest UI, an efficient tool for managing tests in your
  browser, by adding it to your project with simple npm commands. Enhance your
  React development skills by integrating browser-based testing with Vitest for
  convenient module graph visualization and individual test management. Ideal
  for developers seeking practical tools within the Complete Intro to React
  course by Brian Holt.
keywords:
  - Vitest UI
  - React testing
  - Brian Holt
  - npm
  - module graph
  - React development
---

Another fun little tool let's you use is [Vitest UI][ui]. It allows you to see and manage all your tests from the web browser. Let's add it.

```bash
npm i -D @vitest/ui@2.1.3
```

And in your package.json

```json
// in scripts
"test:ui": "vitest --ui"
```

Now from the command line run `npm run test:ui` and it should pop up your browser with the Vitest UI open. Super convenient, particularly in places you need to run individual tests repeatedly and you don't have the VS Code extension. The module graph is a cool visualization as well.

[ui]: https://vitest.dev/guide/ui.html
