---
description: >-
  Learn the basics of creating a simple React app without using tools like Babel
  or Webpack. This tutorial guides you through setting up a project directory,
  writing pure JavaScript with React, and creating components to build a pizza
  ordering system. Ideal for beginners, this step-by-step guide by Brian Holt
  from the Complete Intro to React v9 course helps you understand fundamental
  React concepts using only essential tools.
keywords:
  - React
  - JavaScript
  - tutorial
  - beginner
  - Brian Holt
  - web development
---

Let's start by writing pure React. No compile step. No JSX. No Babel. No Webpack or Vite. Just some JavaScript on a page.

Let's start your project. Create your project directory inside the repo. I'm going to call mine `padre-ginos` since we're going to be building a pizza ordering system throughout this course. Open that directory in VS Code or your editor of choice. Create an index.html and add this markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Padre Gino's</title>
  </head>

  <body>
    <div id="root">not rendered</div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
    <script src="./src/App.js"></script>
  </body>
</html>
```

Let's run this. We could open it directly in our browser but I like using [serve][serve]. Run `npx serve` and open http://localhost:3000/ in your browser.

- Pretty standard HTML5 document. If this is confusing, I teach another course called [Intro to Web Dev][webdev] that can help you out.
- We're adding a root div. We'll render our React app here in a sec. It doesn't _have_ to be called root, just a common practice.
- We have two script tags.
  - The first is the React library. This library is the interface of how to interact with React; all the methods (except one) will be via this library. It contains no way of rendering itself though; it's just the API.
  - The second library is the rendering layer. Since we're rendering to the browser, we're using React DOM. There are other React libraries like React Native, React Unity, React Babylon.js, React Email, React Figma, React Blessed, and others. You need both script tags. The order is not important.
- The last script tag is where we're going to put our code. You don't typically do this but I wanted to start as simple as possible. This script tag must come _after_ the other two.

> If you want to add some CSS right now, [click here][style] to get the stylesheet for this course. Make a file called styles.css and paste the previous file there. Then add a link tag to your html file `<link rel="stylesheet" href="./style.css" />`.  We'll be linking to a CSS file located at `/api/pubic/styles.css` a little later in the course, but before we do that, we need to do some configuration (during the Vite lesson).

Make a new directory called `src` and a new file called `App.js` in that directory and put this in there.

```javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Pixel Perfect Pizzas")
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

This is about the simplest React app you can build.

- The first thing we do is make our own component, App. React is all about making components. And then taking those components and making more components out of those.
- There are two types of components, function components and class components. This is a function component. We'll see class components shortly.
- A function component _must_ return markup (which is what `React.createElement` generates.)
- These component render functions _have_ to be fast. This function is going to be called a lot. It's a hot code path.
- Inside of the render function, you cannot modify any sort of state. Put in functional terms, this function must be pure. You don't know how or when the function will be called so it can't modify any ambient state.
- `React.createElement` creates one _instance_ of some component. If you pass it a _string_, it will create a DOM tag with that as the string. We used `h1` and `div`, those tags are output to the DOM. If we put `x-custom-date-picker`, it'll output that (so web components are possible too.)
- The second empty object (you can put `null` too) is attributes we're passing to the tag or component. Whatever we put in this will be output to the element (like id or style.)
- First we're using `document.getElementById` to grab an existing div out of the HTML document. Then we take that element (which we called `container`) and pass that into `ReactDOM.createRoot`. This is how we signal to React where we want it to render our app. Note later we can `root.render` again to change what the root of our React app looks like (I rarely need to do that.)
- Notice we're using `React.createElement` with `App` as a parameter to `root.render`. We need an _instance_ of `App` to render out. `App` is a class of components and we need to render one instance of a class. That's what `React.createElement` does: it makes an instance of a class. An analogy is that `App` as a _class_ of components is like Honda has a line of cars called Civics. It's a whole line of cars with various different options and parameters. An _instance_ of a Civic would be one individual car. It's a concrete instance of the Civic car line.

> ReactDOM.createRoot is a new API as of React v18. The old `ReactDOM.render` is still available (and deprecated) but it'll render your app in "legacy" mode which won't use all the fun new features packed into React v18.

[webdev]: https://frontendmasters.com/courses/web-development-v3/
[style]: https://github.com/btholt/citr-v9-project/blob/main/api/public/style.css
[serve]: https://github.com/vercel/serve
