---
description: >-
  Explore essential React development tools including NODE_ENV, Strict Mode, and
  React Dev Tools to enhance debugging, optimize performance, and maintain
  modern coding practices. Brian Holt's Complete Intro to React v9 offers
  practical insights into these tools for effective frontend development with
  Vite.js.
keywords:
  - React tools
  - NODE_ENV
  - Strict Mode
  - React Dev Tools
  - Brian Holt
---

React has some really great tools to enhance your developer experience. We'll go over a few of them here.

## `NODE_ENV=development`

React already has a lot of developer conveniences built into it out of the box. What's better is that they automatically strip it out when you compile your code for production.

So how do you get the debugging conveniences then? Well, if you're using Vite.js, it will compile your development server with an environment variable of `NODE_ENV=development` and then when you run `vite build` it will automatically change that to `NODE_ENV=production` which is how all the extra weight gets stripped out.

Why is it important that we strip the debug stuff out? The dev bundle of React is quite a bit bigger and quite a bit slower than the production build. Make sure you're compiling with the correct environmental variables or your users will suffer.

## Strict Mode

React has a new strict mode. If you wrap your app in `<StrictMode></StrictMode>` it will give you additional warnings about things you shouldn't be doing. I'm not teaching you anything that would strip warnings from `StrictMode` but it's good to keep your team in line and not using legacy features or things that will be soon be deprecated.

Be aware that `StrictMode` continually double-renders your components and will run effects twice. It does this catch subtle bugs where your app will change between renders when it's not meant to. It can be helpful, but to be honest, once you learn to write React the correct way you'll nearly never hit that sort of bug.

## Dev Tools

React has wonderful dev tools that the core team maintains. They're available for both Chromium-based browsers and Firefox. They let you do several things like explore your React app like a DOM tree, modify state and props on the fly to test things out, tease out performance problems, and programmatically manipulate components. Definitely worth downloading now. [See here][dev-tools] for links.

[dev-tools]: https://react.dev/learn/react-developer-tools
