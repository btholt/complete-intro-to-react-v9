---
description: >-
  Learn about creating custom hooks in React with Brian Holt's Complete Intro to
  React, covering how to build and integrate a custom hook for fetching pizza of
  the day using React hooks for effective separation and testability. Brian
  demonstrates building a component and using debug tools to inspect React
  custom hooks efficiently.
keywords:
  - custom hooks
  - React hooks
  - Brian Holt
  - pizza of the day
  - debug value
---

## Custom Hooks

One thing that's pretty special about hooks is their composability. You can use hooks to make other hooks! People tend to call these custom hooks. There are even people who go as far to say "never make an API request in a component, always do it in a hook." I don't know if I'm as hardcore as that but I see the logic in it. If you make a custom hook for those sorts of things they become individually testable and do a good job to separate your display of data and your logic to acquire data. I'm more in the camp of make custom hooks for either complicated logic or reusable logic, but for simple cases it's okay to keep things simple.

Okay, so we want to add a "Pizza of the Day" banner at the bottom of our page. This necessitates calling a special API to get the pizza of the day (which should change every day based on your computer's time.) Let's first write the component that's going to use it.

Make a file called PizzaOfTheDay.jsx

```javascript
import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

// feel free to change en-US / USD to your locale
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p className="pizza-of-the-day-price">
            From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
          alt={pizzaOfTheDay.name}
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
```

- The cool part here is the `usePizzaOfTheDay()`. We now just get to rely on that this going to provide us with the pizza of the day from within the black box of the hook working.

Okay, let's go make the hook! Make a file called usePizzaOfTheDay.jsx (you could call this .js instead of jsx but in a React project I just use JSX for all "React-y" things)

```javascript
import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
```

- This looks like what you'd see at the top of a component, right? Now it's just encapsulated as a hook which makes it easy to test by itself! 🎉
- We can use `useState`, `useEffect`, or any hook we want here! We can even use other custom hooks!

Lastly, let's go add this to App.jsx so our component renders.

```javascript
// import at top
import PizzaOfTheDay from "./PizzaOfTheDay";

// under <Order />
<PizzaOfTheDay />
```

You should now see the new component which uses our new hook at the bottom!

Let's add one more fun debugging technique made especially for custom hooks. Put this in usePizzaOfTheDay.jsx:

```javascript
// import useDebugValue
import { useState, useEffect, useDebugValue } from "react";

// add under the hook being used in the render function
useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");
```

Now open your React Dev Tools and inspect our PizzaOfTheDay component. You'll see our debug value there. This is helpful when you have _lots_ of custom hooks and in particular lots of reused custom hooks that have differing values. It can help at a glance to discern which hook has which data inside of it.

> 🏁 [Click here to see the state of the project up until now: 06-custom-hooks][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/06-custom-hooks
