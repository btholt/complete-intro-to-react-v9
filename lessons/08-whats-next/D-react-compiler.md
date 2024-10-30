---
description: >-
  Learn about performance optimization in React with tools like useMemo and
  useCallback, and discover how the React Compiler can automate these
  optimizations for you. This guide provides practical steps for integrating
  React Compiler into your development workflow, ensuring improved performance
  with minimal effort.
keywords:
  - React Compiler
  - React performance
  - useMemo
  - useCallback
  - optimization
  - React development
---

## React Compiler

We didn't talk much at all about performance hacks with React but there are a few. Generally speaking, React is in its "unoptimized" state is fast enough and adding these performance hacks on top make shave a millisecond here or there off, but in general aren't worth doing unless it's a big gain because it makes it harder to code with.

Specifically I'm talking about [useMemo][memo] and [useCallback][callback]. These two tools allow you to control when React will re-render your app. If you're rendering a massive spreadsheet and it's not changing frequently but its parent is, you can use useMemo to say "hey, this doesn't need to re-render unless this condition is true". This only really helps when it's a big thing like this. I don't even teach this in this course because you use it very infrequently and some newer devs get tempted to use it all the time. It will make it hard later to understand why some things are rendering and some aren't. It makes bugs harder to find.

Enter React Compiler (formerly known as React Forget). The React team at Facebook is basically going to do these optimizations for you. It's going to detect "hey, this component shouldn't ever change, I'm going to put useMemo on it for you." I love this as it's free performance with zero thought on behalf of the developer. It's pretty conservative about when it does this, so it should work without a hitch.

> If you do ever hit a case where it is memoizing something and you don't want it do, you can stick "use no memo"; at the top of a file and the React Compiler will skip it.

So let's run the checker on the app.

```bash
npx react-compiler-healthcheck@beta
```

Our app is good to go! You can run this on your codebase too and see if it will work on your code.

Let's go ahead and install the plugin.

```bash
# also prone to change as they're rapidly iterating on this
npm i -D babel-plugin-react-compiler@beta --force
```

Now add this to your vite.config.js

```javascript
// replace react()
react({
  babel: {
    plugins: [
      [
        "babel-plugin-react-compiler",
        {
          target: "19",
        },
      ],
    ],
  },
}),
```

Now let's run your app! If everything is done right, you will notice _nothing_. It will look no different. But open your React dev tools and look through your components. You should see lots of components have "Memo ✨" next to them. These are the components the React Compiler was able to automatically optimize for you.

And that's it! Over time this will get lots better. The React team is saying this is safe to try on your codebase today, so you might try it and see if it works for you. I know they'd love feedback on their GitHub repo.

If you want to learn more, I'd strongly suggest [Lauren Tan's talk from React Conf 2024][lauren]. She was/is the eng manager over React Compiler.

> 🏁 [Click here to see the state of the project up until now: 17-react-compiler][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/17-react-compiler
[callback]: https://react.dev/reference/react/useCallback
[memo]: https://react.dev/reference/react/useMemo
[lauren]: https://www.youtube.com/live/T8TZQ6k4SLE?feature=shared&t=12020
