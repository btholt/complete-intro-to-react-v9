---
description: >-
  In this section of the Complete Intro to React v9 course by Brian Holt, learn
  how to use the `useEffect` hook to make API requests for initializing a list
  of pizzas, manage UI initial load with loading states, and optimize component
  updates using unique keys for rendering efficiency. Enhance your React
  projects with best practices for asynchronous data fetching and component
  optimization.
keywords:
  - React useEffect
  - API requests
  - React loading state
  - React component optimization
  - Brian Holt
---

## Effects

We have enough of an app to start making some API requests now. We want the app to request an initial set of pizzaTypes on initial load of the page. So let's make that happen using a special hook called `useEffect`. `useEffect` allows you to say do a render of this component first so the user can see _something_ then as soon as the render is done, _then_ do something (the something here being an effect). In our case, we want the user to see our UI first then we want to make a request to the API so we can initialize a list of pizzas.

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
  await new Promise((resolve) => setTimeout(resolve, 3000)); // remove this later, just to show you the loading state

  const pizzasRes = await fetch("/api/pizzas");
  const pizzasJson = await pizzasRes.json();
  setPizzaTypes(pizzasJson);
  setLoading(false);
}

// replace the options
{
  pizzaTypes.map((pizza) => (
    <option key={pizza.id} value={pizza.id}>
      {pizza.name}
    </option>
  ));
}

// replace <Pizza /> and button at the end
```

- We put all the logic for fetching pizza types in an async function to make it more readable. You can't make the function provided to useEffect async.
- the `[]` at the end of the useEffect is where you declare your data dependencies. React wants to know _when_ to run that effect again. You don't give it data dependencies, it assumes any time any hook changes that you should run the effect again. This is bad because that would mean any time setPizzaTypes gets called it'd re-run render and all the hooks again. See a problem there? It'd run infinitely since fetchPizzaTypes calls setPizzaTypes.
- You can instead provide which hooks to watch for changes for. In our case, we actually only want it to run once, on creation of the component, and then to not run that effect again. (we'll do searching later via clicking the submit button) You can accomplish this only-run-on-creation by providing an empty array.
- We're using a loading flag to only display data once it's ready. We'll use TanStack Query in a bit to make this code look cleaner. But this is how you do conditional showing/hiding of components in React.
- The `key` portion is an interesting one. When React renders arrays of things, it doesn't know the difference between something is new and something is just being re-ordered in the array (think like changing the sorting of a results list, like price high-to-low and then priced low-to-high). Because of this, if you don't tell React how to handle those situations, it just tears it all down and re-renders everything anew. This can cause unnecessary slowness on devices. This is what key is for. Key tells React "this is a simple identifier of what this component is". If React sees you just moved a key to a different order, it will keep the component tree. So key here is to associate the key to something unique about that component. 99/100 this is a database ID of some variety. _Don't_ use the index of the array as that just isn't right unless the array is literally is never going to change order.

### Updating the Selected Pizza & Price

When a pizza is selected, we need to update the selected pizza and price. First, let's format the price after the `selectedPizza` state is updated:

```javascript
  if(!loading){
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }
```

When the application loads, we don't have our data yet. So we only want to render a selected pizza and price once we are done loading. Add a condition to the JSX to show "Loading..." initially, and then the selected pizza once we are done loading. Add the condition **before** the closing `</form>` tag:

```jsx
...
  {
    loading ? (
      <h3>Loading...</h3>
    ) : (
      <div className="order-pizza">
        <Pizza
          name={selectedPizza.name}
          description={selectedPizza.description}
          image={selectedPizza.image}
        />
        <p>{price}</p>
      </div>
    )
  }
</form>
```

> 🏁 [Click here to see the state of the project up until now: 05-effects][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/05-effects
