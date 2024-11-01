---
description: >-
  Learn how to manage global state in a React application by implementing a
  shopping cart using context. This tutorial, part of the Complete Intro to
  React v9 course by Brian Holt, guides you in creating reusable components and
  sharing state across the application without prop drilling, enhancing your
  React skills with practical examples.
keywords:
  - React
  - shopping cart
  - context API
  - global state
  - Brian Holt
---

## Context

Let's make a cart indicator on the top right of the page. Create a file called Header.jsx and put this in there.

```javascript
export default function Header() {
  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">5</span>
      </div>
    </nav>
  );
}
```

Now let's use that in App.jsx

```javascript
// at top
import Header from "./Header";

// replace .logo
<Header />
```

Right now this will always show 5 but we want that number in .nav-cart-number to reflect how many items we have in our cart. How would we do that? We could move all of cart and its hooks to App.jsx and pass it into both Header and Order. In an app this small, that could be the right choice. But let's look at another way to do it, context.

Context is for app-level state. This is state that exists for your entire app. The currently logged in user would be a good example of this. You wouldn't want the user to exist in just the page level because once you navigate to another page, all state of the previous page is destroyed. You'd want that user info to persist between pages, and thus context is a good thing for that. Context allows you to keep a global state for your app. We're going to use it for the shopping cart which actually makes good sense: if a user navigates to another page, you'd want to keep their shopping cart between loads. This is a good way to think about when you may want to use context: if you want that stage to persist between pages.

So let's make it work. Make a file called `contexts.jsx`. It's not a component so I tend to not capitalize it. The React docs do capitalize it. Up to you.

```javascript
import { createContext } from "react";

export const CartContext = createContext([[], function () {}]);
```

That's it. Pretty simple. It's called contexts with an `s` because if you had other contexts (like a UserContext) you could put those all in the same file. The `[[], function () {}]` isn't strictly necessary; it's a default value your context would use if no context provider is there (which should never happen.) This really only ends up being useful for TypeScript types – the type you give here is what TypeScript will use to validate it. In theory it could be helpful for testing too. The reason for the weird value is that it's a React hook: an array where the first value is an array (like our cart is) and the second value is a function (the setCart function).

Okay, let's go put it in App.jsx.

```javascript
// at the top
import { StrictMode, useState } from "react"; // need useState
import { CartContext } from "./contexts";

// replace App
const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};
```

We're creating a hook (notice we are not destructuring) and passing that in as the value. The Provider makes that context available only inside of its children. In theory you could have multiple providers from the same context but honestly I've never had a reason to do it.

Alright, let's go make Order.jsx work now.

```javascript
// at top
import { useState, useEffect, useContext } from "react"; // need useContext
import { CartContext } from "./contexts";

const [cart, setCart] = useContext(CartContext); // change cart hook to use context
```

That's it! Everything else works the same. In our case we're just using a hook directly from context, but you can put anything in context; it doesn't have to be a hook.

Let's go use it in our Header now too.

```javascript
// at top
import { useContext } from "react";
import { CartContext } from "./contexts";

// top of function
const [cart] = useContext(CartContext);

// replace span number
🛒<span className="nav-cart-number">{cart.length}</span>
```

That's it! We don't need the setCart function so we don't import that. Otherwise all looks pretty normal!

So that's context. It's super useful for stuff like this where we don't want to "prop drill" our state everywhere. Since cart is now being held at the App level, we definitely could have just said `<Header cart={cart} />` and called it a day, and in this specific use case I would have. But now imagine if Header was super deeply nested and you had to pass that state down a lot of children components – it gets messy quickly. This is what we call prop drilling. React's explicit data flow is a feature, not a bug. It makes where data came from and where data is going very readable. But it can make your code verbose in a non-helpful way, and context is an escape hatch for that. In general, use context sparingly and only where it's _really_ inconvenient to just do it the normal way of using props.

> 🏁 [Click here to see the state of the project up until now: 08-context][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/08-context
