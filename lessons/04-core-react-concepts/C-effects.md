---
description: "useEffect is a critical hook for React, allowing developers to do asynchronous actions like making HTTP requests"
---

We have enough of an app to start making some API requests now. We want the app to request an initial set of pets on initial load of the page. So let's make that happen using a special hook called `useEffect`. `useEffect` allows you to say do a render of this component first so the user can see _something_ then as soon as the render is done, _then_ do something (the something here being an effect). In our case, we want the user to see our UI first then we want to make a request to the API so we can initialize a list of pizzas.

> Make sure you have both your Vite dev server running _and_ your API server running. Both.

Let's refactor Order.jsx

```javascript
// change import at top
import { useEffect, useState } from "react";
import Pizza from "./Pizza";

// outside of the render function
// feel free to change en-US / USD to your locale
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// add to the other useStates inside component at top
const [pizzaTypes, setPizzaTypes] = useState([]);
const [loading, setLoading] = useState(true);

let price, selectedPizza;
if (!loading) {
  selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
  price = intl.format(
    selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : ""
  );
}

useEffect(() => {
  fetchPizzaTypes();
}, []);

async function fetchPizzaTypes() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const pizzasRes = await fetch("/api/pizzas");
  const pizzasJson = await pizzasRes.json();
  setPizzaTypes(pizzasJson);
  setLoading(false);
}

// replace the options
{
  pizzaTypes.map((pizza) => <option value={pizza.id}>{pizza.name}</option>);
}

// replace <Pizza /> and button at the end
```

- We're taking advantage of closures here that if we define the requestPets function _inside_ of the render that it will have access to that scope and can use all the hooks there.
- We put all the logic for fetching pizza types in an async function to make it more readable. You can't make the function provided to useEffect async.
- the `[]` at the end of the useEffect is where you declare your data dependencies. React wants to know _when_ to run that effect again. You don't give it data dependencies, it assumes any time any hook changes that you should run the effect again. This is bad because that would mean any time setPets gets called it'd re-run render and all the hooks again. See a problem there? It'd run infinitely since requestPets calls setPets.
- You can instead provide which hooks to watch for changes for. In our case, we actually only want it to run once, on creation of the component, and then to not run that effect again. (we'll do searching later via clicking the submit button) You can accomplish this only-run-on-creation by providing an empty array.
- We're using a loading flag to only display data once it's ready. We'll use TanStack Query in a bit to make this code look cleaner. But this is how you do conditional showing/hiding of components in React.

> 🏁 [Click here to see the state of the project up until now: 05-effects][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/05-effects
