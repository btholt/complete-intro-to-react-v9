---
description: >-
  Learn how to test a custom React hook, usePizzaOfTheDay, by implementing a
  fake component and utilizing renderHook from testing-library/react. This
  approach ensures your hooks behave correctly, maintaining code integrity while
  interacting with APIs, like the example API call for "Pizza of the Day."
keywords:
  - React testing
  - custom hooks
  - renderHook
  - testing-library
  - API testing
---

Let's say we needs tests for our custom hook, usePizzaOfTheDay. Testing custom hooks is a bit of a trick because they are inherently tied to the internal workings of React: they can't be called outside of a component. So how we do we get around that? We fake a component! Make a file called `usePizzaOfTheDay.test.jsx` in our `__tests__` directory.

```javascript
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description:
    "Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
  image: "/public/pizzas/calabrese.webp",
  sizes: { S: 12.25, M: 16.25, L: 20.25 },
};

function getPizzaOfTheDay() {
  let pizza;

  function TestComponent() {
    pizza = usePizzaOfTheDay();
    return null;
  }

  render(<TestComponent />);

  return pizza;
}

test("gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const pizza = getPizzaOfTheDay();
  expect(pizza).toBeNull();
});
```

It's a little weird to implement a fake component to test something (we're dangerously close to the line of testing implementation details) but this is essentially library code and we want to assure ourselves this code works if we use it frequently in our code base.

We can make this better though. Let's rewrite our test to look like this:

```javascript
import { renderHook } from "@testing-library/react"; // change import

test("to be null on initial load", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay(""));
  expect(result.current).toBeNull();
});
```

Here the helper `renderHook` abstracts away that oddity we had to do to get that hook tested. But rest assured it's doing essentially the same thing: creating a component under the hood that's running the hook lifecycle methods appropriately for you.

Let's add a test to make sure it does the right thing with the API response and calls the right API

```javascript
import { renderHook, waitFor } from "@testing-library/react"; // add waitFor

test("to call the API and give back the pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay(""));
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
```

- waitFor is a handy trick where you need to wait for React to settle. You give it a body that throws errors until it's true. `expect` when it doesn't work throws an error so that's how this works.
- Once it resolves to true, it passes the test and moves on. If it fails like 20 times (that's configurable) it will then fail the test.
- Some people this is too into the implementation details and I half agree. However it is useful from the perspective that this hook needs to work in a certain way and it has an expectation of an API to call which does affect user behavior so it could be useful. If this was truly our codebase, I'd just test the PizzaOfTheDay component and call it good. But if we used this hook in lots of places, I'd probably a test just for it.
