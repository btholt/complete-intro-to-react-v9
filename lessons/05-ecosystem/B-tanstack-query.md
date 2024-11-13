---
title: TanStack Query
description: >-
  Learn how to create a past orders page in React using TanStack Query to
  facilitate seamless asynchronous API calls, enhancing code cleanliness and
  efficiency. This guide by seasoned developer Brian Holt provides detailed
  instructions on integrating React Query ESLint configurations and leveraging
  React Query Devtools for better debugging. Ideal for web developers looking to
  optimize React-based projects with effective data fetching techniques.
keywords:
  - React
  - TanStack Query
  - API calls
  - web development
  - JavaScript
  - Brian Holt
---

## Tanstack Query

Let's make make a past orders page. Create a new file, `past.lazy.jsx`. If your Vite server is already running, it will automatically stub it out for you! Pretty cool developer experience from TanStack.

Now let's install our next tool, [TanStack (React) Query][tsq].

```bash
npm i @tanstack/react-query@5.59.13
npm i -D @tanstack/react-query-devtools@5.59.13 @tanstack/eslint-plugin-query@5.59.7
```

React Query makes doing async API calls so much easier. So much easier / better, that I almost never use `useEffect` anymore like we did for the pizzas list or for the pizza of the day. The code is cleaner, easier to read, better cached, and less bug prone. In short, it's just better. It's good for you to know how to use effects, but as you go forward just use TanStack Query for API calls.

Let's get started. Let's start by adding their ESLint config to ours. They have some useful rules in there. In eslint.config.mjs

```javascript
// at top
import pluginQuery from "@tanstack/eslint-plugin-query";

// under reactPlugin.configs.flat["jsx-runtime"]
...pluginQuery.configs["flat/recommended"],
```

This will add a few rules to your ESLint that are specific to React Query. I have found these helpful, and more importantly, not annoying, so I tend to add them every time.

Let's also add the dev tools, like we did for the router. In `src/routes/__root.jsx`:

```javascript
// at top
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// under router dev tools
<ReactQueryDevtools />
```

Finally, we need to add the `QueryClient`. In `App.jsx`, add:

```javascript
// Add imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a property under the router
const queryClient = new QueryClient()

// Add the provider to the app
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
```

Now in the bottom right of your window you'll see a 🏝️. Click on that and we'll open the dev tools. We haven't used the dev tools yet so it'll be empty.

So react-query makes interacting with APIs very simple and makes it easy to read. You just read a hook and it'll either give you a `isLoading` status or the data. Once the data comes back, it'll refresh the component with the data. So let's start by writing our very simple fetch call. Create a folder called `api` inside of `src` and create `getPastOrders.js` and add:

```javascript
export default async function getPastOrders(page) {
  const response = await fetch(`/api/past-orders?page=${page}`);
  const data = await response.json();
  return data;
}
```

Very simple request to an API that returns data. That's it!

Let's now go make `past.lazy.jsx`.

```javascript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });
  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
```

- We're using hooks to track the page we're on.
- We're using the useQuery hook to make API calls and we provide it the queryFn of how to go fetch that data.
- We're giving it keys which act as cache keys. We're giving `past-orders` as the key but it could be any unique key to this page. Then we give it the page. What's cool about this is that while we will request the page 1 the first time we request it, the second time we request page 1 it'll see it'll see that we already have this in cache and not request it. How cool is is that? That used to require so much logic to handle it and now React Query just does it for you.
- Now open the dev tools. You can see all the pages being loaded in. Pretty cool, right?
- Try taking out `page` from the query key. It'll yell at you. This is the ESLint config we pulled in from Tanstack Query. Because we're using that `page` in the request, we need to use it as a caching key. If you depend on a variable to make a request, it should be apart of the caching key.
- We're giving it a `staleTime` of 30 seconds (30,000 milliseconds). This allows someone using the page to browse around a bit and not bombard the API too much but the page won't ever be too stale. If you omit `staleTime`, it will refetch every time.

That's it! React Query is both simple to use and super flexible to handle a tough problem. It's one of my favorite libraries for React.

> 🏁 [Click here to see the state of the project up until now: 10-query][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/10-query
[tsq]: https://tanstack.com/query/latest
