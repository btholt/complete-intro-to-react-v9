# TODO – this is to be rewritten

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
