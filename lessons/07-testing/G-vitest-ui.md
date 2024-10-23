---
title: Vitest UI
description: >-
  Learn how to use Vitest UI for managing tests in your browser. This tool is
  highly convenient for running individual tests repeatedly without the need for
  a VS Code extension.
keywords:
  - Vitest UI
  - npm
  - testing
  - web browser
  - package.json
  - Vitest
---

Another fun little tool let's you use is [Vitest UI][ui]. It allows you to see and manage all your tests from the web browser. Let's add it.

```bash
npm i -D @vitest/ui
```

And in your package.json

```json
// in scripts
"test:ui": "vitest --ui"
```

Now from the command line run `npm run test:ui` and it should pop up your browser with the Vitest UI open. Super convenient, particularly in places you need to run individual tests repeatedly and you don't have the VS Code extension. The module graph is a cool visualization as well.
