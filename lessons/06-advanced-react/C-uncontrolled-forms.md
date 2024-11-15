---
description: >-
  Learn how to create a contact page using TanStack Query in React with Brian
  Holt's Complete Intro to React, v9. Discover how to handle posts via
  mutations, manage uncontrolled forms, and integrate these features seamlessly
  into your React application.
keywords:
  - React contact page
  - TanStack Query
  - uncontrolled forms
  - React
  - Brian Holt
---

## Uncontrolled Forms

We are now going to do a contact page for our site. As part of that, we will accept a name, email, and message from our users and submit it our backend. Like all good backends, ours will log it to the console and then ignore it.

We are going to see two new concepts here: how to do a post with TanStack Query (which they call a mutation) and how to do uncontrolled forms with React. Let's start with our API query. In src/api, create a file called `postContact.js` and put this in there.

```javascript
export default async function postContact(name, email, message) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
```

Create a new link to our page in index.lazy.jsx

```javascript
// after past orders
<li>
  <Link to="/contact">Contact</Link>
</li>
```

Create a new route called `contact.lazy.jsx` in `src/routes`

```javascript
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message")
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
```

- We are using a mutation from TanStack React Query. It works very similar to normal gets except this one sends information to the API instead of gets it.
- Notice we're using `isSuccess` to show or hide the form. Once the mutation has successfully been submitted, we just want to show them that and then hide the form.
- Notice we're not using state or useState at all here. We're using an "uncontrolled" form which just means we're letting the DOM manage the state. Only on a submit event are we reading from the DOM using the FormData API. We use that to submit to our API the contact data.
- There's also isError and isIdle, we just didn't use them from TanStack Query.
- Also notice in the dev tools for TanStack Query the mutations (it's in another tab.)

Try it! You'll notice in the logs of where-ever your API is running that it logs out the contact info.

> 🏁 [Click here to see the state of the project up until now: 13-uncontrolled-forms][step]

[step]: https://github.com/btholt/citr-v9-project/tree/master/13-uncontrolled-forms
