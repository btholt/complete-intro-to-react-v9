---
description: >-
  Learn how to create an interactive form in React with useState hooks, allowing
  users to add pizzas to their order in this detailed coding guide from the
  "Complete Intro to React, v9" course by Brian Holt. Explore concepts like
  controlled inputs, JSX syntax, event handling, and the importance of state
  management in React development. Enhance your web development skills with
  practical React examples and create dynamic applications effectively.
keywords:
  - React tutorial
  - useState hooks
  - controlled inputs
  - web development
  - Brian Holt
---

## Hooks

Okay, so now we want to make it so people can add pizzas to their order. We need a little form that allows them to select the pizza and the size. Create a new file called Order.jsx and add the following:

```javascript
import Pizza from "./Pizza";

export default function Order() {
  const pizzaType = "pepperoni";
  const pizzaSize = "M";
  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select name="pizza-type" value={pizzaType}>
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option>
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            name="Pepperoni"
            description="Mozzarella Cheese, Pepperoni"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}
```

Now add it to your App.jsx:

```javascript
// delete Pizza import, and add Order
import Order from "./Order";

// in App.jsx, replace all the Pizzas
<Order />
```

> 🚨 You'll have some errors in the console, that's okay.

Now navigate to http://localhost:5173/ and see that you have two inputs, one for the pizza type and a set of radio buttons for the size. Try and select something with the inputs. You'll see that you can't modify them. Why? Let's think about how React works: when you interact with the inputs, React detects that a DOM event happens. When that happens, React thinks _something_ may have changed so it runs a re-render. Providing your render functions are fast, this is a very quick operation. It then diffs what's currently there and what its render pass came up with. It then updates the minimum amount of DOM necessary.

> In the recorded course, the layout is vertical because the `order-pizza` DIV was in the wrong place. Use the markup above. The layout should look like this:


![Order Page Layout](/images/order-page-layout.webp)


Notice we're using `className` instead of `class` on the HTML element for CSS classes. This is because `class` is a reserved word in JS and JSX is still just JS. So instead they opted to use `className` which is the [name of the JS API][js-api] for interacting with class names.

Like `className`, `htmlFor` is used because `for` is a reserved word in JS.

So if we type in our input and it re-renders, what gets out in the `select` or radio button tags? Well, its value is tied to `pizzaType` and `pizzaSize` and nothing changed those, so they remain the same. In other words, two way data binding is _not_ free in React. I say this is a feature because it makes you explicit on how you handle your data. Let's go make it work.

```javascript
// in Order.jsx
import { useState } from "react";

// pizzaType and pizzaSize location
const [pizzaType, setPizzaType] = useState("pepperoni");
const [pizzaSize, setPizzaSize] = useState("medium");

// replace input
<select
  onChange={(e) => setPizzaType(e.target.value)}
  name="pizza-type"
  value={pizzaType}
>
  […]
</select>

// add to all the radio buttons
onChange={(e) => setPizzaSize(e.target.value)}
```

- This is called a hook. Other frameworks like Vue have adopted it as well.
- A hook called such (in my head) because it's a hook that gets caught every time the render function gets called. Because the hooks get called in the same order every single time, they'll always point to the same piece of state. Because of that they can be stateful: you can keep pieces of mutable state using hooks and then modify them later using their provided updater functions.
- An _absolutely key_ concept for you to grasp is hooks rely on this strict ordering. As such, **do not put hooks inside if statements or loops**. If you do, you'll have insane bugs that involve `useState` returning _the wrong state_. If you see `useState` returning the wrong piece of state, this is likely what you did. Every hook must run every time in the same order.
- The argument given to `useState` is the default value. In our case, we could give it `""` as our default value to make the user have to select something first but in our case we want to default to pepperoni pizza and medium size.
- `useState` returns to us an array with two things in it: the current value of that state and a function to update that state. We're using a feature of JavaScript called destructuring to get both of those things out of the array.
- We use the `setPizzaType` / `setPizzaSize` function in the `onChange` attribute of the input. Every time the input is typed into, it's going to call that functions which call `setPizzaType` and `setPizzaSize` with what has been typed into the input or what has been selected or what has been clicked on. When `setPizzaType` and `setPizzaSize` are called, React knows that its state has been modified and kicks off a re-render.
- You can make your own custom hooks; `useState` is just one of many.
- Historically, React has been written using classes with state being on the instance of the component. This is still a supported pattern in React. We'll see how to do it later.
- We could have put an onChange handler on each of the radio buttons. However event bubbling works the same in React as it does in the normal DOM and we could put it directly on the div that encapsulates all the radio buttons and just have to do it once.
- You can use `useState` as many times as you need for various pieces of state! Again, this is why ordering is important because React relies on `useState` to be called in strictly the same order every time so it can give you the same piece of state.
- Similar to above. We're using `onChange` because it makes it more accessible.

> I'm showing you how to do a "controlled form" in that we're using hooks to control each part of the form. In reality, it'd be better to leave these _uncontrolled_ (aka don't set the value) and wrap the whole thing in a form. Then we can listen for submit events and use that event to gather info off the form. This is less code and less burdensome to write. If you have a standard form sort of thing to write, do that as an uncontrolled form. If you need to do dynamic validation, react to a user typing a la typeahead (functionality that provides real-time suggestions), or something of the ilk, then a controlled input is perfect, otherwise stick to uncontrolled.
> Also what's new in React is called a "form action" that is considered unstable. In the future you will just add `<form action="blah">[…]</form>` and a form action will handle the entire form for you.

Another side note: event bubbling in React works just like you would expect. In theory you can have mega event handler in React but the lint rules and React's dev tools get noisy about it if you do it that way so I tend to just follow their recommendation.

```javascript
// you could replace the div surrounding the radio buttons and remove all the onChange handlers
<div onChange={(e) => setPizzaSize(e.target.value)}>[…]</div>
```

> 🏁 [Click here to see the state of the project up until now: 04-hooks][step]

[babel]: https://babeljs.io/
[step]: https://github.com/btholt/citr-v9-project/tree/main/04-hooks
[js-api]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
