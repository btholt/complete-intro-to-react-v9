---
description: >-
  Learn how to separate React components into distinct files and make reusable,
  flexible components that accept props, transforming a static app into a
  dynamic one. This guide provides code examples in creating a React app
  featuring customizable Pizza components, enhancing React development skills.
  Discover these strategies in Brian Holt's Complete Intro to React, ideal for
  budding web developers.
keywords:
  - React components
  - JavaScript
  - web development
  - reusable components
  - dynamic apps
---

Now that we've done that, let's separate this out from a script tag on the DOM to its own script file (best practice.)

Modify your code in `App.js` so it looks like:

```javascript
const Pizza = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "The Pepperoni Pizza"),
    React.createElement("p", {}, "Mozzarella Cheese, Pepperoni"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

> 🚨 You will be seeing a console warning `Warning: Each child in a list should have a unique "key" prop.` in your browser console. React's dev warnings are trying to help your code run faster. Basically, React tries to keep track of components that are swapped in order. In a list, it does that by you giving it a unique key it can track. If it sees two things have swapped, it'll just move the components instead of re-rendering.

- To make an element have multiple children, just pass it an array of elements.
- We created a second new component, the `Pizza` component. This component represents one pizza. When you have distinct ideas represented as markup, that's a good idea to separate that it into a component like we did here.
- Since we have a new `Pizza` component, we can use it multiple times! We just use multiple calls to `React.createElement`.
- In `createElement`, the last two parameters are optional. Since Pizza has no props or children (it could, we just didn't make it use them yet) we can just leave them off.

Okay so we can have multiple pizzas but it's not a useful component yet since not all pizza will be a pepperoni pizza. Let's make it a bit more complicated.

```javascript
const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    }),
    React.createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

Now we have a more flexible component that accepts props from its parent. Props are variables that a parent (App) passes to its children (the instances of Pizza.) Now each one can be different! Now that is far more useful than it was since this Pizza component can represent not just a pepperoni, but any Pizza. This is the power of React! We can make multiple, re-usable components. We can then use these components to build larger components, which in turn make up yet-larger components. This is how React apps are made!

> 🏁 [Click here to see the state of the project up until now: 01-no-frills-react][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/01-no-frills-react
