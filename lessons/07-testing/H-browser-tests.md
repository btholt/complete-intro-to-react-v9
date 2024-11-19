---
description: >-
  Explore the emerging support for browser-based testing with Vitest, featuring
  Playwright integration for fast and reliable testing. Learn how to configure
  Vitest for both Node.js and browser environments, leveraging libraries like
  vitest-browser-react, and gain insights from Brian Holt on crafting effective
  tests for user experiences in React applications. This guide is ideal for
  developers keen on improving their testing setups in modern web development
  environments.
keywords:
  - Vitest
  - Playwright
  - browser-based testing
  - React testing
  - vitest-browser-react
  - Brian Holt
  - web development
---

> 🚨 This is experimental and very likely to change in the future. Consider this a sneak peak into what is coming, not what to do today.

Vitest is beginning to support more deeply browser-based testing. To those of us that have been around long enough to remember Selenium, this may strike fear deep int your heart. But fear not! Browser-based testing tools have come so far along since then that it's both fast and reliable, in particular thanks to the Microsoft project [Playwright][playwright].

However this is still early days. I'm going to show you how to set it up but be warned that this prone to change as they're still actively working on it!

So first let's install the libraries we need.

```bash
npm i -D @vitest/browser@2.1.3 playwright@1.48.0 vitest-browser-react@0.0.1
```

You can see that the vitest-browser-react library is still 0.0.1 as of writing so be extra aware it's likely to have changed by the time you read this.

Okay, so now we want to write browser based tests. But we have also have a bunch of existing Node.js-based tests. Some our already-existing Node.js based tests won't work in the browser. But no worries, Vitest/Vite has a tool just for this, workspaces. It's actually made to handle monorepos, but it will work here just as well. Make a file called `vitest.workspace.js` (you don't normally need this as your Vite config is normally enough.)

```javascript
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      include: ["**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/*.browser.test.{js,jsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "firefox", // you can use chromium or webkit here too
      },
    },
  },
]);
```

Now delete the `test` items from your vite.config.js file.

This is a test-only config for Vite (and therefore Vitest.) Now if a test ends in `.node.test.jsx` it will run through the happy-dom based environment and if it ends in `.browser.test.jsx` it will run in our new browser-based environment with Playwright. Let's go rename our tests to reflect that.

- Cart.browser.test.jsx
- contact.lazy.node.test.jsx
- Pizza.node.test.jsx
- usePizzaOfTheDay.node.test.jsx

Snapshotting works in the browser so that one works okay. Anything using vitest-fetch-mock is Node.js only so for those we need to mark them as node. We're going to make a new Pizza file so let's leave that one. And our custom hook test mocks fetch so that one is Node only.

Okay, now create a `Pizza.browser.test.jsx`

```javascript
import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("alt text renders on image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );

  const img = await screen.getByRole("img");

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
```

- `render` will take a React component and render it in a vacuum. You can then poke and prod it as you need to test it.
- A big part of what Playwright and vitest-browser-react want you to do is not test implementation details but to test actual user experiences. Don't test the internal state of a React component but do test what users will see and experience. As such, a lot of we'll be testing will be around roles, attributes, etc.
- [@testing-library][principles] has a good doc on why they choose to test this way.
- In general, vitest-browser-react aims to be a drop in replacement for @testing-library/react.

Looks really similar, right? Alright, let's run it. `npm run test`. You should see the same Vitest UI but now some of the tests are actually running in the browser.

> It will likely prompt you to run a command like `npx playwright install`. You'll install local copies of browsers to able to run them super fast.

Cool, right? And really fast! Let's do one more. Let's make a `Header.jsx` test. We're going to test that the cart number is correct. Remember when Facebook notification numbers were always wrong? We're going to make sure that doesn't happen with our cart indicator. In your Header.jsx file:

```javascript
data-testid="cart-number" // add to .nav-cart-number
```

Now make a Header.browser.test.jsx

```javascript
import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Header from "../Header";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import { CartContext } from "../contexts";

test("correctly renders a header with a zero cart count", async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <CartContext.Provider value={[[]]}>
        <Header />
      </CartContext.Provider>
    ),
  });

  const router = createRouter({ routeTree: rootRoute });
  const screen = render(<RouterProvider router={router}></RouterProvider>);

  const itemsInCart = await screen.getByTestId("cart-number");

  await expect.element(itemsInCart).toBeInTheDocument();
  await expect.element(itemsInCart).toHaveTextContent("0");
});

test("correctly renders a header with a three cart count", async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <CartContext.Provider
        value={[[{ pizza: 1 }, { pizza: 2 }, { pizza: 3 }]]}
      >
        <Header />
      </CartContext.Provider>
    ),
  });

  const router = createRouter({ routeTree: rootRoute });
  const screen = render(<RouterProvider router={router}></RouterProvider>);

  const itemsInCart = await screen.getByTestId("cart-number");

  await expect.element(itemsInCart).toBeInTheDocument();
  await expect.element(itemsInCart).toHaveTextContent("3");
});
```

We do have to bend over a bit backwards to make sure TanStack Router is happy, hence all the making of root routes. Remember also that our cart gets its cart from context so we have to pass it in that way. Beyond that, it works very similar!

Again, these are early days for browser-based testing with Vite so proceed in your professional settings with caution. However the future is bright with Playwright!

> 🚨 NOTE: If you want to add code coverage back into the project, you'll need to use Istanbul since, at the time of this recording, this wasn't supported in React 19 with V8

First, you'll need to uninstall V8 and install Istanbul:

```bash
npm uninstall @vitest/coverage-v8@2.1.3
npm install -D @vitest/istanbul
```
Then move the coverage configuration to the `vitest.workspace.js` file:

```javascript

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      // ...
      // add to the end of the happy-dom test object 
      coverage: {
        provider: "istanbul"
        reporter: ["text", "json", "html"],
      },
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      // ...
      // add to the end of the browser test object 
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
  },
]);
```



> 🏁 [Click here to see the state of the project up until now: 14-testing][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/14-testing
[principles]: https://testing-library.com/docs/guiding-principles
[playwright]: https://playwright.dev/
