Before we get too far into this, here's my thoughts on testing

- Try to test functionality, not implementation. Make your tests interact with components as a user would, not as a developer would. This means you're trying to do more to think of things like "what would a user see" or "if a user clicks a button a modal comes up" rather than "make sure this state is correct" or "ensure this library is called". This isn't a rule; sometimes you need to test those things too for assurance the app is working correctly. Use your best judgment.
- Every UI I've ever worked on changes a lot. Try to not unnecessarily spin your wheels on things that aren't important and are likely to change.
- In general when I encounter a bug that is important for me to go back and fix, I'll write a test that would have caught that bug. Actually what I'll do is before I fix it, I'll write the test that fails. That way I fix it I'll know I won't regress back there.
- Ask yourself what's important about your app and spend your time testing that. Ask yourself "if a user couldn't do X then the app is worthless" sort of questions and test those more thoroughly. If a user can't change themes then it's probably not the end of the world (a11y is important) so you can spend less time testing that but if a user can't log in then the app is worthless. Test that.
- Delete tests on a regular basis. Tests have a shelf life.
- Fix or delete flaky tests. Bad tests are worse than no tests

Let's write a very basic test. We are going to test Pizza.jsx. Let's fathom we've had issues with the correct alt text being rendered and we want to write a test that test that our image gets rendered, with the correct src and the correct alt text.

```javascript
import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../src/Pizza";

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
- `test` lets you set up tests. the string should be super descriptive so you can tell what test broke if your test fails.
- `expect` lets you make assertions about your React components.
- A big part of what Playwright and vitest-browser-react want you to do is not test implementation details but to test actual user experiences. Don't test the internal state of a React component but do test what users will see and experience. As such, a lot of we'll be testing will be around roles, attributes, etc.
- [@testing-library][principles] has a good doc on why they choose to test this way.

[principles]: https://testing-library.com/docs/guiding-principles
