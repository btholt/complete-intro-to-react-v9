---
description: >-
  Learn how to effectively test React components with a focus on functionality
  over implementation using React Testing Library, through this hands-on guide
  by Brian Holt. Gain insights into user-centric testing methodologies, writing
  bug-catching tests, and managing test lifecycle for enhanced app reliability,
  specifically applied to the Pizza.jsx component.
keywords:
  - React Testing
  - React
  - Vitest
  - Testing Library
  - React Components
  - Brian Holt
  - Pizza.jsx
---

Let's write our first test for Pizza.jsx. In general, here's my methodology for testing React:

- Try to test functionality, not implementation. Make your tests interact with components as a user would, not as a developer would. This means you're trying to do more to think of things like "what would a user see" or "if a user clicks a button a modal comes up" rather than "make sure this state is correct" or "ensure this library is called". This isn't a rule; sometimes you need to test those things too for assurance the app is working correctly. Use your best judgment.
- Every UI I've ever worked on changes a lot. Try to not unnecessarily spin your wheels on things that aren't important and are likely to change.
- In general when I encounter a bug that is important for me to go back and fix, I'll write a test that would have caught that bug. Actually what I'll do is _before_ I fix it, I'll write the test that fails. That way I fix it I'll know I won't regress back there.
- Ask yourself what's important about your app and spend your time testing that. Ask yourself "if a user couldn't do X then the app is worthless" sort of questions and test those more thoroughly. If a user can't change themes then it's probably not the end of the world (a11y is important) so you can spend less time testing that but if a user can't log in then the app is worthless. Test that.
- Delete tests on a regular basis. Tests have a shelf life.
- Fix or delete flaky tests. Bad tests are worse than no tests.

Okay, create a new file called `Pizza.test.jsx`. This naming convention is just habit. `Pizza.spec.jsx` is common too. But as long as it's in the `__tests__` directory it doesn't much matter what you call it.

```javascript
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("alt text renders on image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});
```

This is your most basic test. It renders a React component, and then starts running assertions on it. Here we're asserting that our pizza image ends up with the correct alt text on it. Not the most useful test but a good start for us seeing how to assert something. I could see this being useful if we had bugs that occasionally alt text wasn't showing up.

We're using getByRole here to grab the image on the page. In general React Testing Library wants you to adopt a user-centric mindset of how you're asserting things on the page. In this case we're trying to find an image which is something a user would see. Contrast that with using a CSS selector to select the image (which you can do, it's just frowned upon) which is very implementation-centric (a user doesn't know nor care about CSS classes.)

Let's add another test to make sure that we have a default image if pizza isn't passed an image.

> 🚨 This doesn't work yet. That's intentional.

```javascript
test("to have default image if none is provided", async () => {
  const screen = render(
    <Pizza name={"Cool Pizza"} description="super cool pizza" />
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
```

Well, first thing it is going to complain about is that we don't clean up after ourselves after each test. React Testing Library requires us to.

```javascript
// at top
import { render, cleanup } from "@testing-library/react"; // add cleanup
import { afterEach, expect, test } from "vitest"; // add afterEach
afterEach(cleanup);
```

The test still doesn't pass? Oh, that's because it caught a bug! If you don't give it a image, it just breaks. That's not a good user experience. Let's go fix it in Pizza.jsx.

```javascript
// replace src
src={props.image ? props.image : "https://picsum.photos/200"}
```

Now it works!

Bam! Some easy React testing there for you.
