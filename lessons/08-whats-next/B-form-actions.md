---
description: >-
  Learn how to upgrade your application to React 19 and simplify form handling
  in this segment of Brian Holt’s Complete Intro to React, version 9. Discover
  new React form actions, "use server" directives for server-side logic, and
  useFormData hooks to manage input states effectively. Ideal for React
  developers seeking practical techniques to streamline their web applications.
keywords:
  - React 19
  - form actions
  - useFormData
  - Brian Holt
  - React upgrade
---

## Form Actions

Okay, so let's actually upgrade our app to be React 19.

> 🚨 Pay attention here, as you need to figure out which version of React to install.

[Go here][npm] and look at the versions of React published on npm. If you see that React 19 is still in canary/rc/next (which are all the same) then you can run `npm i react@rc react-dom@rc`. You'll get a lot of warnings about things not matching versions in your command-line, that's totally okay.

If React 19 is latest, then run `npm install react@19 react-dom@19` and then follow these instructions. Be extra cautious because things may have changed!!

Okay, let's talk form actions. A lot of web interfaces is just handling form inputs, and so the React team decided to make it easier to do that. It's actually really similar to what we've done already, just a little less boilerplate. Open your contact.lazy.jsx and let's modify this page to use a form action.

```javascript
mutationFn: function (formData) { // change to formData
  // remove e.preventDefault
  // remove formData constructor
  return postContact(
    formData.get("name"),
    formData.get("email"),
    formData.get("message"),
  );
},

// change onSubmit to action
<form action={mutation.mutate}>
```

That's it! It really is just a convenience function to make handling for submits even easier to do. There's nothing wrong with what we had either, and that will continue to work as-is too.

Let's go convert `order.lazy.jsx` too

```javascript
// extract submission function from form
function addToCart() {
  setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
}
// update to action
<form action={addToCart}>[…]</form>;
```

Same as above. But here's what cool if you're using something like Next.js or Remix: we can use the `'use server'` directive here and make this a _server_ action. Something like

```javascript
function addToCart(formData) {
  "use server";
  sql(`INSERT INTO cart (user_id, pizza_type, size) VALUES ($1, $2)`, [
    formData.pizza_type,
    formData.size,
  ]);
}
```

Since it's on the server, we can now safely insert into our database, directly from inside our React component. React/Next.js will handle all the details of handling the execution of that on server. Pretty cool, right? We'll talk more about this in Intermediate React v6.

Let's do one more cool trick here. There's a new hook called `useFormStatus` that lets children components see if they're inside of a form being submitted without having to pass lots of data around.

In `contact.lazy.jsx`

```javascript
// at top
import { useFormStatus } from "react-dom"; // note react-dom, not react

// replace the two inputs
<ContactInput name="name" type="text" placeholder="Name" />
<ContactInput name="email" type="email" placeholder="Email" />

// at the bottom
function ContactInput(props) {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
```

- This is a silly example, but imagine you had really complicated inputs that had a design system, tool tips, and all sorts of other UIs. This is common in large React codebases. This could be really useful for that.
- As a side note, if I have really small components like ContactInput, I'll just stick in the same file like we did here. It can be a useful pattern. Some people are purists and demand one file, one component. I am not a purist.
- We didn't do the button or the text area just for brevity's sake but you could.
- Since we're local, this pending state will be super short. But you will notice the background flash gray. That's the disabled state.

And that's form actions!

> 🏁 [Click here to see the state of the project up until now: 15-form-actions][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/15-form-actions
[npm]: https://www.npmjs.com/package/react?activeTab=versions