---
description: >-
  Learn how to test a Contact page in React using Vitest and vitest-fetch-mock,
  a tool to simplify fetch mocking. The tutorial covers setting up mocks,
  rendering components with React Query's QueryClientProvider, filling out form
  inputs, simulating user interactions, and verifying API requests, providing a
  comprehensive guide for beginner to job-ready React developers under guidance
  from Brian Holt, creator of the Complete Intro to React course, version 9.
keywords:
  - React testing
  - Vitest
  - vitest-fetch-mock
  - React Query
  - Contact form testing
---
Let's test the Contact page. It has a nice, simple user interaction. User puts their information in, we submit to the API, and we show them a submitted header. Let's test all of that.

First we need a helper function, vitest-fetch-mock. We don't _need_ it because Vitest can do it, but I think it just makes things easier.

```bash
npm i -D vitest-fetch-mock@0.3.0
```

And now let's write the code

```javascript
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "Brian",
    email: "test@example.com",
    message: "This is a test message",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;

  const btn = screen.getByRole("button");

  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("Submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
```

- We need to wrap React Query with a query provider always or it doesn't work. In this case we can just make that part of the initial render.
- You can pre-populate React Query with a valid cache and then test if your app uses that correctly. Totally valid way to test. In this case we want to make sure our endpoint is being posted to correctly (to make sure we record a contact)so we aren't doing that.
- `vi` is Vitest's spy library, similar to sinon.
- vitest-fetch-mock is just a nice layer on top of vi. We could just use vi directly.
- Notice we can just call `click` and it does all the things we'd expect. Cool, right?
- We then make some assertions that our h3 shows up correctly, that our API was called once, and that it was submitted to our API the way we expect it to. This may seem a bit implementation-oriented, and it is, but typically in a larger app we'd have a library for calling our API and we'd test that individually but we don't here so we're wrapping it all together.
