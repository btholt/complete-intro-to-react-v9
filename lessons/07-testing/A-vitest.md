---
description: ""
---

This is meant to be a very brief treatise on how to do testing on React applications. This will be a brief intro on how to set up Vitest tests for the application we just created.

## Testing with Vitest

[Vitest][vitest] is a test runner made by the fine folks who make Vite (as well as Vue.) The idea behind Vitest is that you already have a complete build pipeline for making an app, why should that pipeline be any different for test? It shouldn't; you want your testing environment to look as much like your app environment as possible.

They designed it to be a drop-in replacement for [Jest][jest] which is what I have taught for this course since the beginning. Jest is great and still a very viable tool to use for testing, even with Vite. We're just going to use Vitest because 1. we don't have to do any more configuration and 2. 100% of what you will learn in here is going to be useful if you use Jest. Win-win. If you want to learn Jest specifically, [take a look at Intermediate React v4's testing section.][v4]

> Fun side note: [Jest is now an OpenJS project and no longer directly under Facebook][fb].

While Vitest is not using Jasmine directly, its APIs mimic Jasmine APIs (just like Jest.)

Let's get going Run `npm install -D vitest@2.1.3 @vitest/browser@2.1.3 playwright@1.48.0 vitest-browser-react@0.0.1`.

> This course previously taught [@testing-library/react][tlr] and used a synthetic DOM tool called [happy-dom][hd]. Vitest now has a first class integration with [Playwright][playwright] and their own version @testing-library/react, vitest-browser-react. Hence this version will use those tools. If you want to learn those other tools, the [v8][v8] version of this course all still works.

We are going to be using the latest-and-greatest testing tool from Microsoft called Playwright, the spirtual successor to Google's Puppeteer tool. Using this tool, your command line client will spin up a _real_ copy of Webkit, Firefox, or Chromium and run your tests inside of them. Can't beat the real thing, and it's finally fast and not-flaky enough for it to be worth it!

Okay, let's go set up Vitest to work with our Vite project. In your `vite.config.js`

```javascript

// under server
test: {
  setupFiles: ["vitest-browser-react"],
  browser: {
    enabled: true,
    name: "firefox", // or chromium or webkit
    provider: "playwright",
  },
},
```

If you've never run Playwright before, you should run `npx playwright install` to install all the browser stuff necessary.

Let's go add an npm script. In your package.json.

```json
"test": "vitest"
```

> Fun trick: if you call it test, npm lets you run that command as just `npm t`.

This command let's you run Vitest in an interactive mode where it will re-run tests selectively as you save them. This lets you get instant feedback if your test is working or not. This is probably my favorite feature of Vitest. So try it now. It should error because we have no tests, but it should open a browser with the testing harness loaded.

```bash
# these all do the same thing
npm run test
npm test
npm t
```

Also good to go install the [Vitest VS Code extension][vitest-vsc] if you're using VS Code.

Now that we've got that going, let's go write a test.

[vitest-vsc]: https://marketplace.visualstudio.com/items?itemName=vitest.explorer
[jest]: https://jestjs.io
[jasmine]: https://jasmine.github.io/
[enzyme]: http://airbnb.io/enzyme/
[res]: https://raw.githubusercontent.com/btholt/complete-intro-to-react-v5/testing/__mocks__/@frontendmasters/res.json
[fb]: https://twitter.com/cpojer/status/1524419433938046977
[hd]: https://github.com/capricorn86/happy-dom
[vitest]: https://vitest.dev/
[v4]: https://frontendmasters.com/courses/intermediate-react-v4/setup-jest-testing-library/
[tlr]: https://github.com/testing-library/react-testing-library
[v8]: https://frontendmasters.com/courses/intermediate-react-v5/setup-react-testing-library-vitest/
[playwright]: https://playwright.dev/
