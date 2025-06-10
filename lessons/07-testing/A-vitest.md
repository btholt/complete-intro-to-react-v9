---
description: >-
  Learn how to set up and perform testing on React applications using Vitest, a
  test runner compatible with Vite's build pipeline, from Brian Holt's Complete
  Intro to React course. This guide provides step-by-step instructions for
  integrating Vitest with @testing-library/react for efficient React testing,
  drawing on similarities with Jasmine and Jest APIs to deliver seamless testing
  experiences. Ideal for React developers seeking efficient test integration,
  this tutorial emphasizes real-time feedback and browser-like test environments
  with happy-dom.
keywords:
  - React testing
  - Vitest
  - Jest
  - React development
  - Brian Holt
---

This is meant to be a very brief treatise on how to do testing on React applications. This will be a brief intro on how to set up Vitest tests for the application we just created. For more information about Vite, Vitest, and testing in general, check out the [Build Tools & Testing Learning Path][lp].

## Testing with Vitest

[Vitest][vitest] is a test runner made by the fine folks who make Vite (as well as Vue.) The idea behind Vitest is that you already have a complete build pipeline for making an app, why should that pipeline be any different for test? It shouldn't; you want your testing environment to look as much like your app environment as possible.

They designed it to be a drop-in replacement for [Jest][jest] which is what I have taught for this course since the beginning. Jest is great and still a very viable tool to use for testing, even with Vite. We're just going to use Vitest because 1. we don't have to do any more configuration and 2. 100% of what you will learn in here is going to be useful if you use Jest. Win-win. If you want to learn Jest specifically, [take a look at Intermediate React v4's testing section.][v4]

> Fun side note: [Jest is now an OpenJS project and no longer directly under Facebook][fb].

While Vitest is not using Jasmine directly, its APIs mimic Jasmine APIs (just like Jest.)

Let's get going. Run `npm install -D vitest@2.1.3 @testing-library/react@16.0.1 happy-dom@15.7.4`.

`@testing-library/react`, formerly called `react-testing-library`, is a tool that has a bunch of convenience features that make testing React significantly easier and is now the recommended way of testing React, supplanting [Enzyme][enzyme]. Previous versions of this course teach Enzyme if you'd like to see that (though I wouldn't recommend it unless you have to.)

We need to tell Vitest that we need a browser-like environment which it will fulfill via the [happy-dom][hd] package. happy-dom is a lot like jsdom but smaller, doesn't do 100% of what the browser does, and is much, much faster.

Next go into your src directory and create a folder called `__tests__`. Notice that's double underscores on both sides. Why double? They borrowed it from Python where double underscores ("dunders" as I've heard them called) mean something magic happens (in essence it means the name itself has significance and something is looking for that path name exactly.) In this case, Vitest assumes all JS files in here are tests.

Let's go add an npm script. In your package.json.

```json
"test": "vitest"
```

> Fun trick: if you call it test, npm lets you run that command as just `npm t`.

This command lets you run Vitest in an interactive mode where it will re-run tests selectively as you save them. This lets you get instant feedback if your test is working or not. This is probably my favorite feature of Vitest.

Okay, one little configuration to add to your `vite.config.js`.

```javascript
// add this to the config object
test: {
  environment: "happy-dom",
},
```

Now that we've got that going, let's go write a test.

[jest]: https://jestjs.io
[jasmine]: https://jasmine.github.io/
[enzyme]: http://airbnb.io/enzyme/
[istanbul]: https://istanbul.js.org
[res]: https://raw.githubusercontent.com/btholt/complete-intro-to-react-v5/testing/__mocks__/@frontendmasters/res.json
[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
[fb]: https://twitter.com/cpojer/status/1524419433938046977
[hd]: https://github.com/capricorn86/happy-dom
[vitest]: https://vitest.dev/
[v4]: https://frontendmasters.com/courses/intermediate-react-v4/setup-jest-testing-library/
[lp]: https://frontendmasters.com/learn/build-tools/
