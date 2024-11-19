---
description: >-
  Explore the Complete Intro to React (v9) course by Brian Holt, focusing on
  core React concepts and upcoming React 19 features like 'use client' and 'use
  server'. Gain insights into new capabilities such as putting elements in the
  head, preload/preconnect hints, and seamless integration of custom components
  in React development.
keywords:
  - Brian Holt
  - React 19
  - React development
  - web components
  - use client
---

## React 19

> 🚨 The rest of the course covers experimental features of React 19. If you want to try out these features without affecting your current project, we recommend using the `14-testing` project.

This course has been centered on version 18.3. The nice thing about React is that while they do make breaking changes, they are usually fairly intentional about it and do so sparingly. In other words, what you learned today will still be useful five years from now. You could take the version of the course I taught five years ago and still be pretty up to date on how to write React. In other words, despite the fact that React 19 is imminent (or perhaps even out by the time you read this), there's no need to panic. All the stuff they are adding will just complement what you have learned and not change it.

Do keep an eye out for version 6 of my Intermediate React course. We will cover a lot of the React 19 features in that course.

So, given React 19 is about out, and we know 95% of what is going to be in it, we are going to cover a few features so that you can be prepared for it. Do remember, we are going to use the React 19 release candidate, which means while conceptually that are very unlikely to change big concepts, they may tweak the precise API of how it works. Just be aware that it may change a bit.

First thing, let's discuss a few features that are cool but not worth us spending a lot of time writing code for. Then we'll cover a few that we'll actually add code to our app for.

## 'use client' and 'use server'

Let's start with one of the bigger shifts in React. We will cover this _extensively_ in Intermediate React so if you are curious, check that course out when it comes out. Essentially we can indicate to React "hey, only run this component on the server" or likewise, "hey, only render this client side". Why would you do that?

For server components, we can do things like reference server-side secrets, query databases, call private APIs, or other things that we want data for our client side app but we can't query client-side without risking leaking secrets or DDOS. All of the logic will be executed server-side and then the finished component will be sent down to the client. Pretty cool, right?

They're even taking it step further with taintUniqueValue and taintObjectReference. These allow a developer to say "hey, this is super sensitive information, make sure this never is sent to the client". You would use this with like an API key, a database connection string, or some other secret that you wouldn't want to accidentally leak. I love this because what if a developer changes a 'use server' directive to a 'use client' directive? They may not notice and send it to production accidentally, causing a data breach. With the concept of taint, you can make sure that never happens.

'use client' is the opposite – something that would never make sense to render server-side. Think like a highly interactive component like a text editor or a maps widget or something like that – it's meant to be a client-side experience so you better off just passing all the down to the client immediately and let them do the rendering. Keep in mind that you don't need to use this directive unless you are doing server-side rendering. By default it will still do client-side rendering.

## Putting stuff in the head

Imagine you want your React component to add `<link>`, `<meta>`, `<title>` or other HTML pages in the doc. Right now you either need to use a portal or you need something like [react-helmet][helmet] to do that. With React 19, you just need to render the tag and it will automatically stick it in the header.

```javascript
const MyPizza = () => (
  <div>
    <h1>I love pizza</h1>
    <title>🍕 Brian Loves Pizza 🍕</title>
  </div>
);
```

Now whenever MyPizza gets rendered it will change the title of the doc (which what shows up in browser tab).

## preload and preconnect

Two pretty helpful functions to help give hints to the browser of what it may want to start loading in the background. If you are not familiar with the concepts, [head here][preload] to read more, but long story short it's for things like images, fonts, scripts, stylesheets, etc. You can let the browser know "hey, we're likely to going to need load these soon, can you either preconnect to this URL to get ready to download it or just go ahead and preload it?" This will allow your user to have more instantaneous experiences since they won't need to wait for these things to load when required. Keep in mind these are hints though and the browser can ignore them. A good of example of this could be that your phone is in low-power mode, it may ignore those hints as it wants to save battery.

```javascript
const EnterConfirmation = () => {
  preload("https://example.com/text-editor.js", { as: "script" });
  return (
    <div>
      <a href="/text-editor">Click here to open the text editor</a>
    </div>
  );
};
```

## Custom components (aka web components)

It's always been possible, in theory, to use web components with React, but it's been a huge pain in the butt, involving refs and other careful planning to make sure you don't accidentally un-render and re-render it. Suffice to say, it was possible but impractical.

Now with React 19 it will just handle all of that caretaking of the custom elements for you, just treat it like any other normal tag and React will do all the babysitting for you. It's certainly a big step in making custom elements that work across Angular, React, Svelte, etc. but who knows, we've been talking about custom elements my whole career (seriously, I remember seeing a Polymer talk at the first Fluent conf I went to) and it still isn't here yet.

## More stuff!

[Click here][react19] to read the official React 19 blog post if you want to read more. Lots of cool stuff coming!!

[helmet]: https://github.com/nfl/react-helmet
[preload]: https://www.debugbear.com/blog/resource-hints-rel-preload-prefetch-preconnect
[react19]: https://react.dev/blog/2024/04/25/react-19
