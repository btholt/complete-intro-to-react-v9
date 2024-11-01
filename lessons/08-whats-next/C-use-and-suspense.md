---
title: use and Suspense
description: >-
  Explore React Suspense and the new 'use' hook in React 19, alongside TanStack
  Query integration, to manage component rendering and data loading seamlessly.
  Learn how to implement Suspense to improve code readability and handling of
  async operations in React applications, guided by seasoned developer Brian
  Holt.
keywords:
  - React Suspense
  - use hook
  - TanStack Query
  - React 19
  - async rendering
---

## use and Suspense

We've been talking about React Suspense for a long time, and technically still we are not suppose to use it directly. But we React 19 we will get some blessed ways to start using it. (Some libraries already use it.)

The idea behind Suspense is that a React component can start rendering and then suspend itself if all its data hasn't loaded yet. This is cool because your code reads really well: it basically looks like you're assuming the data is already there, and React takes care of getting it behind the scene.

This is what the idea of the new `use` hook is from React. You say `use(myPromise)` and the React component will only render once myPromise has rendered.

Luckily TanStack Query already has a few ways of doing this, so we're going to use that. But just know that `use` works with any promise, not just TanStack Query.

First open App.jsx, we have to enable the experimental support for this in TanStack Query (you may not need to this in the future.)

```javascript
// replace queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});
```

Now in past.lazy.jsx, we need to do some refactoring.

```javascript
import { Suspense, useState, use } from "react"; // import Suspense and use

// move query and page hooks to ErrorBoundary component
function ErrorBoundaryWrappedPastOrderRoutes() {
  const [page, setPage] = useState(1);
  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  }).promise;
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Orders …</h2>
          </div>
        }
      >
        <PastOrdersRoute
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

// first line in PastOrderRoute
const data = use(loadedPromise);
// also, we had to remove the useQuery call to getPastOrders (with an S), and the related if (isLoading) return statement
```

- We use Suspense to tell React where to pause rendering until _everything_ in it has resolved. If you have several things that suspend, this won't render until they all complete.
- fallback tells it what to render while it's suspended
- We need to query inside the parent component (and thus keep track of the page too) because the promise needs to exist outside of the component that is getting suspended. Otherwise it'd be freshly called every single your component rendered. Similar to error boundaries.
- We shoved everything in our error boundary wrapping component. This should probably be renamed.
- Again, we're using TanStack Query's support for this, but it could be any promise. TanStack Query just made it easy.
- TanStack Query [has several other ways of doing Suspense][tsq-suspense]. We just wanted to try the `use` hook.
- [use][use] has a few other uses. Check it out in the docs.
- Unlike most hooks, use, can be used in conditionals and for loops. Kinda weird given most of the rules around hooks, but still true.

> 🏁 [Click here to see the state of the project up until now: 16-use][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/16-use
[tsq-suspense]: https://tanstack.com/query/v5/docs/framework/react/guides/suspense
[use]: https://react.dev/reference/react/use
