---
description: >-
  Learn how to use class components and error boundaries in React development
  with Brian Holt's "Complete Intro to React, v9" course. Understand the
  transition from function components to class components for error handling and
  gain insights into managing API errors using techniques like
  `componentDidCatch`. Ideal for developers navigating legacy React codebases or
  dealing with API errors, this course offers practical skills to improve your
  React applications.
keywords:
  - React error boundaries
  - class components
  - API error handling
  - React development
  - Brian Holt
  - legacy React
  - Complete Intro to React
---

## Error Boundaries

Frequently there are errors with APIs with malformed or otherwise weird data. Let's be defensive about this because we still want to use this API but we can't control when we get errors. We're going to use a feature called `componentDidCatch` to handle this. This is something you can't do with hooks so if you needed this sort of functionality you'd have to use a class component.

This will also catch 404s on our API if someone give it an invalid ID!

A component can only catch errors in its children, so that's important to keep in mind. It cannot catch its own errors. Let's go make a wrapper to use on PastOrdersRoute. Make a new file called ErrorBoundary.jsx

This is also the first time I'm going to be showing you what was the old way of writing components, called class components. All React code used to be written this way but while it's not deprecated it is explicitly not recommended by the React team. Previous to this version of the Complete Intro to React I still taught class components as part of the course. In the past year, I kept track and I wrote class components _zero_ times. And as such it is time to retire teaching them as part of an intro course. However, with error boundaries it is the only way to write them, so we will do a brief intro to them so we can learn them. In reality, I would likely just use [react-error-boundary][reb] and never have to write a class component at all!

A class component is really similar to a function component (which is what we have been writing) but have a few key differences.

- You cannot use any hooks with class components (useState, useEffect, etc.)
- Every class component has a `render()` function. It works mostly the same as a function component.
- Instead of the useState hook you'll use `this.state` which is an object that contains all state for that component.
- To change state, you'll use a `this.setState({ key: "value" })` function. This allows you to change state like your `setKey` hook would have.
- Instead of useEffect, you use lifecycle methods. componentDidMount, componentDidUpdate, componentWillUnmount, etc. To read more about them, [go here][lifecycle].
- Instead of a props parameter being passed into the function, you'll use `this.props`.
- This is enough here. You shouldn't be authoring class components anymore except for error boundaries. But you may encounter them in legacy React codebases.

```javascript
import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

- Now anything that is a child of this component will have errors caught here. Think of this like a catch block from try/catch.
- A static method is one that can be called on the constructor. You'd call this method like this: `ErrorBoundary.getDerivedStateFromError(error)`. This method must be static.
- If you want to call an error logging service, `componentDidCatch` would be an amazing place to do that. I can recommend [Sentry][sentry] and [TrackJS][trackjs].
- `this.props.children` is any child component inside of the component. e.g. if someone renders `<MyComponent><h1>hi</h1></MyComponent>`, the `<h1>hi</h1>` is consider the the "children". This works in function components too.
- Because we just return children if there's no error, the ErrorBoundary component doesn't render anything itself if there are no errors.

Let's go make PastOrderRoute use it in case the API throws an error.

```javascript
// add import
import ErrorBoundary from "../ErrorBoundary";

// replace Route export
export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

// beneath Route export
function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}
```

- Now this is totally self contained. No one rendering PastOrderRoute has to know that it has its own error boundary. I'll let you decide if you like this pattern or if you would have preferred doing this in App.js at the Router level. Differing opinions exist.
- We totally could have made ErrorBoundary a bit more flexible and made it able to accept a component to display in cases of errors. In general I recommend the "WET" code rule (as opposed to [DRY][dry], lol): Write Everything Twice (or I even prefer Write Everything Thrice). In this case, we have one use case for this component, so I won't spend the extra time to make it flexible. If I used it again, I'd make it work for both of those use cases, but not _every_ use case. On the third or fourth time, I'd then go back and invest the time to make it flexible.

Now, if you want to, go add a `throw new Error("lol");` in your render function for the PastOrderRoute to see it work!

> 🏁 [Click here to see the state of the project up until now: 12-error-boundaries][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/12-error-boundaries
[sentry]: https://sentry.io/
[trackjs]: https://trackjs.com/
[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[reb]: https://github.com/bvaughn/react-error-boundary
[lifecycle]: https://react.dev/reference/react/Component
