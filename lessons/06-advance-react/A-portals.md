What if you are rendering a page and you want to render something in another part of the page at the same time? Think like you have a contextual right navigation and you have a page that wants to render into the contextual nav. We could use something like context to do that and that would be totally acceptable. But there's another cool way called a portal to do this as well. It even lets us render outside our app totally, like we're about to do.

We're going to do a modal or a "popover". I think these are bad user experiences but it's a perfect use case for a portal so we're going to do it! In our case, because we want the modal to render in front of everything, we need the div that the modal renders into to be first in the DOM. So let's go make a div that does that. Open your index.html file and put this in there.

```javascript
// above #root
<div id="modal"></div>
```

By default this will have nothing in it, but once we render our modal it render inside this div instead of root. Make a new file in src called Modal.jsx

```javascript
// basically stolen from the React docs
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
```

- This uses a ref. A ref is a reference to something that need to be exactly the same between renders. A hook would get regenerated / recreated so we need a ref because it'll create a div and then it hand back the _same_ div every render. It's important that it's the same div because it'll be the one we use to render the portal.
- We're using createPortal to render into this new modal div we're chosen for our modal. But this could be a contextual nav or any other DOM div we want.
- We use the returned function on the effect to clean up when this Modal is unmounted from the DOM. Otherwise we'd leak memory.

Before we use our Modal, we'll need to make another API call function get a past order. In our example here, we're going to make it so you can click on one of the rows in our past orders page to see what was in the order. In `src/api`, add a file called `getPastOrder.js` (no `s`) and add this.

```javascript
export default async function getPastOrders(order) {
  const response = await fetch(`/api/past-order/${order}`);
  const data = await response.json();
  return data;
}
```

Cool, let's go use this to render our Modal now. Open past.lazy.jsx.

```javascript
// import at top
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// top of the render function
const [focusedOrder, setFocusedOrder] = useState();

const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
  queryKey: ["past-order", focusedOrder],
  queryFn: () => getPastOrder(focusedOrder),
  enabled: !!focusedOrder,
  staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
});

// last thing before closing div
{
  focusedOrder ? (
    <Modal>
      <h2>Order #{focusedOrder}</h2>
      {!isLoadingPastOrder ? (
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Size</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {pastOrderData.orderItems.map((pizza) => (
              <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                <td>
                  <img src={pizza.image} alt={pizza.name} />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.size}</td>
                <td>{pizza.quantity}</td>
                <td>{intl.format(pizza.price)}</td>
                <td>{intl.format(pizza.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading …</p>
      )}
      <button onClick={() => setFocusedOrder()}>Close</button>
    </Modal>
  ) : null;
}
```

- We're using React Query again here. We're using the `enabled` key to only make this request when the user has set a focusedOrder. If there's no focusedOrder, then it won't make the request. `!!` is the same as "not not". It makes a number like `5` be `true` and a number like `0` or `undefined` be `false`.
- We set the staleTime to day. These orders shouldn't change very frequently.
- If there's no focusedOrder, we don't render the Modal, which means the portal is unused.
- If there is a focusedOrder, we render the modal and show a loading indicator that we're loading the rest of the info.
- When a user clicks Close, we set the focusedOrder to be undefined again which causes the Modal to unrender.

That's it!