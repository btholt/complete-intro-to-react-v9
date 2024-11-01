---
description: >-
  Discover snapshot testing in React with Brian Holt's Complete Intro to React,
  a course offering insights into efficient testing techniques for components
  like Cart.jsx. Learn about the benefits and limitations of snapshot tests, how
  to implement them using tools like Vitest, and explore their practical
  applications in UI and API development. Ideal for developers looking to
  enhance their testing strategies in web development.
keywords:
  - React
  - Snapshot Testing
  - Brian Holt
  - Vitest
  - UI Testing
---

I'm not a fan of seeking 100% test coverage. I think it's a fool's errand and a waste of time. I'd rather you write five tests that cover the most important five lines of your code than see you write one test for five less-important pieces of UI code.

But let's show you an easy way to cheat and get there! Let's talk about snapshot testing.

Snapshot tests are low confidence, low cost ways of writing tests. With more-or-less a single line of code you can assert: this code doesn't break, and it isn't changing over time.

Let's test Cart.jsx. It's a pretty stable component that doesn't do a lot and we don't expect it to change a lot if at all. A low cost, low confidence test could fit here. Make a file called Cart.test.jsx

```javascript
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
```

Run this to see Vitest say it created a snapshot. Go look now at Cart.test.jsx.snap in the `src/__tests__/__snapshots__` to see what it created. You can see it's just rendering out what it would look like. Now if you modify Cart.jsx it will fail the test. As you can see, it's a quick gut check to make sure your changes don't have cascading problems. If I modify App.jsx and it causes this to fail it means I can catch it and validate quickly. Some people don't find it useful. I'm not entirely sold on it to be honest; at most these should be used very sparingly. This could be useful if you have a component that you expect to _never_ change and it would be a problem if it did. Maybe a footer? I don't know. I never write these.

Let's add some pizzas and see how it does.

```javascript
test("snapshot with some stuff in cart", () => {
  const { asFragment } = render(
    <Cart
      cart={[
        {
          pizza: {
            id: "pepperoni",
            name: "The Pepperoni Pizza",
            category: "Classic",
            description: "Mozzarella Cheese, Pepperoni",
            image: "/public/pizzas/pepperoni.webp",
            sizes: {
              S: 9.75,
              M: 12.5,
              L: 15.25,
            },
          },
          size: "M",
          price: "$12.50",
        },
        {
          pizza: {
            id: "ckn_pesto",
            name: "The Chicken Pesto Pizza",
            category: "Chicken",
            description:
              "Chicken, Tomatoes, Red Peppers, Spinach, Garlic, Pesto Sauce",
            image: "/public/pizzas/ckn_pesto.webp",
            sizes: {
              S: 12.75,
              M: 16.75,
              L: 20.75,
            },
          },
          size: "L",
          price: "$20.75",
        },
        {
          pizza: {
            id: "bbq_ckn",
            name: "The Barbecue Chicken Pizza",
            category: "Chicken",
            description:
              "Barbecued Chicken, Red Peppers, Green Peppers, Tomatoes, Red Onions, Barbecue Sauce",
            image: "/public/pizzas/bbq_ckn.webp",
            sizes: {
              S: 12.75,
              M: 16.75,
              L: 20.75,
            },
          },
          size: "S",
          price: "$12.75",
        },
      ]}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
```

This works, and now you can stick with this, but here's a problem. If you look at your snapshot, it's rendering Pizza components as well. Now if you modify Pizza.jsx (that has its own tests already) your _Cart.jsx_ test is going to fail. This is misleading, nothing is wrong or different with Cart.jsx. In a previous version of this class I show you how to accomplish this with react-test-renderer. However the folks at @testing-lib think shallow rendering is more harmful than helpful (I like, 75% agree) so we'll leave it out. [Click here][fem] to see me teach this previously. It's 95% the same, just uses Jest instead of Vitest.

Update your snapshots by either running `npm run test -- -u` or you can use the watcher to do it with either `u` to update all at once or do `i` one-by-one.

You should commit snapshot files to git.

I'll leave it up to you how much you value these tests. I think they have a very limited place in UI testing but it's pretty low level of help. Frequently they become more noise than help. In any case, keep them in your toolbox, some times they can be helpful.

> As a side note, one place I saw some use for snapshot tests (as they can track any object shape over time, not just React components) was in the backend in API response shapes. We'd write a snapshot test that this API response is always going to look like this and it should fail the test if it breaks. This makes it very intentional every time you modify the API response (since your API clients are likely relying on it being a certain shape.) Furthermore, it means the frontend devs can use these snapshot files to see what the API response is going to look like. Niche, but it was helpful on the one project I worked on that had it.

[fem]: https://frontendmasters.com/courses/intermediate-react-v4/snapshots/
