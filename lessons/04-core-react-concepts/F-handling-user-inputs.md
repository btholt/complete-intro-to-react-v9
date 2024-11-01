---
description: >-
  Learn how to handle user cart submissions and checkout process in React with
  Brian Holt's Complete Intro to React, v9. Build a shopping cart component
  using Order.jsx and Cart.jsx, manage cart state with hooks, and implement
  server-side checkout functionality efficiently. Ideal for React developers
  seeking practical, hands-on experience in web development.
keywords:
  - React
  - shopping cart
  - checkout
  - Brian Holt
  - Order.jsx
  - Cart.jsx
  - web development
---

## Handling User Input

So now we want to be able to handle the user's cart and submitting our order. Let's go add what we need to Order.jsx

```javascript
// add import
import Cart from "./Cart";

// add another hook
const [cart, setCart] = useState([]);

// replace <form>
<form
  onSubmit={(e) => {
    e.preventDefault();
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
  }}
>
  […]
</form>;

// just inside the last closing div
{
  loading ? <h2>LOADING …</h2> : <Cart cart={cart} />
}
```

So now we're using an onSubmit to handle the adding to cart. Awesome! Then we're passing that into Cart to have a nice display.

Let's make the cart. Make a file called Cart.jsx and add

```javascript
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD", // feel free to change to your local currency
});

export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> –
            <span className="type">{item.pizza.name}</span> –
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
```

> Normally doing key this way is a bad idea, but we wouldn't reorganize this list, nor care if it rerendered anyway, so it gets a pass.

Now we have a nice shopping cart experience. So how do actually checkout on the server? Let's do that! We probably want to do it as the Order level. It already has the Cart and we can just leave the Cart as a dumb display component. We can just pass a function to call into the Cart component and call it and run the function at the Order level.

```javascript
// inside the render body
async function checkout() {
  setLoading(true);

  await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart,
    }),
  });

  setCart([]);
  setLoading(false);
}

// replace Cart
<Cart checkout={checkout} cart={cart} />;
```

Now we can pass that checkout function in and whenever someone clicks inside the form, it will run the checkout function from the Order components. We're doing a simple loading animation, doing a fetch, and then clearing the status once we're all done. Not too bad!

> 🏁 [Click here to see the state of the project up until now: 07-handling-forms][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/07-handling-forms
