---
description: >-
  Learn to set up your React project using Vite, a fast build tool preferred by
  the React community, with step-by-step guidance from Brian Holt. This tutorial
  covers the installation and configuration of Vite, React, and essential
  plugins to optimize your development environment.
keywords:
  - React
  - Vite
  - Brian Holt
  - JavaScript
  - frontend development
---

## Vite

The build tool we are going to be using today is called [Vite][vite]. Vite (pronounced "veet", meaning quick in French) is a tool put out by the Vue team that ultimately ends up wrapping [Rollup][rollup] which does the actual bundling. The end result is a tool that is both easy to use and produces a great end result.

> Fun fact: there's a new project being developed called [Rolldown][rolldown] which is written in Rust and aims to replace Rollup.

Our end result that we want from a build tool is that

- We can separate files out for code organization and have a tool stitch them together for us
- We can include external, third-party libraries from npm (like React!)
- The tool will optimize the code for us by minifying and other optimizing techniques

Previous versions of this course used [Parcel][parcel], another tool near-and-dear to my heart. It is still an amazing tool and one I recommend you check out. We ended up moving to Vite because the React community has selected it as the tool-of-choice for the moment and this course aims to give you the community norms of React. Even older versions of this course previously taught [Webpack][webpack].

First, let's install the things we need for Vite.

```bash
npm install -D vite@5.4.2 @vitejs/plugin-react@4.3.1
```

The former is the tool itself and the latter is all the React specific features we will need. Now that we have those installed, we need to modify our index.html just a little bit.

```html
<!-- delete the two unpkg script lines -->
<script type="module" src="./src/App.js"></script>
```

We need to add module to the script tag so that the browser knows it's working with modern browser technology that allows you in development mode to use modules directly. Instead of having to reload the whole bundle every time, your browser can just reload the JS that has changed. It allows the browser to crawl the dependency graph itself which means Vite can run lightning fast in dev mode. It will still package it up for production so we can support a range of browsers.

Next, let's make our config file. Make a file in the root of your project called `vite.config.js` and stick this in there:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

By default, Vite will look for the index.html file in the root directory and treat it as the head of a source graph. It'll crawl all your HTML, CSS, and JavaScript you link to from there and create your project for you. We don't have to do any more configuration than that. Vite will take care of the rest.

Okay, let's _actually_ install React to our project.

```bash
npm install react@18.3.1 react-dom@18.3.1
```

- We did not include the `-D` because React is not a development tool, it's a production dependency
- React and ReactDOM are versioned together so you can assume those versions will always be the same

Finally, head to App.js and modify the following

```javascript
// add to the top
import React from "react";
import { createRoot } from "react-dom/client";

// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
```

Now let's set up our scripts to start Vite. In package.json, put:

```json
// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

Be sure to also add `"type: module"` to your package.json. Vite has deprecated support for Common.js and now requires you to use ESM style modules.

> Note: you will get a warning from Vite like `Files in the public directory are served at the root path.
Instead of /public/style.css, use /style.css.` – ignore this, we'll fix it in a bit.

`dev` will start the development server, typically on http://localhost:5173/. `build` will prepare static files to be deployed (to somewhere like GitHub Pages, Vercel, Netlify, AWS S3, etc.) `preview` lets you preview your production build locally.

> Note that we've changed domains here. By default Vite uses localhost:5173. Fun fact, 5173 sort of spells VITE if you make the 5 its Roman Numeral version, V.

## Alternatives

There are a myriad of fantastic developer tools out there available. We chose Vite because the industry has been using it for a while but I have zero problem with you selecting other tools. Just trying to expose everyone to great tools.

In particular, [esbuild][esbuild] is a wonderful tool to take a look at as well.

> 🏁 [Click here to see the state of the project up until now: 02-tools][step].

[step]: https://github.com/btholt/citr-v9-project/tree/master/02-tools
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://www.rollupjs.org/
[vite]: https://vitejs.dev/
[rolldown]: https://rolldown.rs/
[esbuild]: https://esbuild.github.io/
