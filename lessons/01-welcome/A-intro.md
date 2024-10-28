---
description: >-
  Join Brian Holt in "Complete Intro to React, v9," a beginner-friendly course
  that equips you with essential React skills using a first-principles approach,
  incorporating tools like Vite and JSX, making you job-ready in the React
  ecosystem.
keywords:
  - Brian Holt
  - React
  - web development
  - javascript
  - frontend
  - Vite
  - JSX
---

> 🚨 You do not need to watch/read previous versions of this course. This is just the ninth revision of the course.

Hello! And welcome to the Complete Intro to React, version 9. In this course you will go from not knowing anything about React to being job ready. This course teaches all the core concepts of React aiming to be the most useful. You will learn React from a first-principles methodology – we will start with no build tools or anything like that, just vanilla JavaScript and React. Over time we add tools like Vite, JSX, ESLint, Prettier, etc. so you can learn how to construct your own stack from scratch. I will teach a few ecosystem tools as well, testing, and what's coming soon for React.

## Who is this course for?

You! This course is for anyone looking to get started in React or deepen their expertise in it. No experience is necessary. However, I guarantee anyone who is interested in React will learn something in here. This probably shouldn't be your first programming or JavaScript course, but beyond that, it should be comfortable for anyone. We do use some Node.js to run our little API and for the build tools but no real Node.js experience is necessary, I'll give you the commands necessary to run it.

## Who am I?

![Brian teaching](/images/social-share-cover.jpg)

My name is Brian Holt and I've been writing React for a long time. I shipped Reddit's first React code in 2014.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">We shipped reddit&#39;s first production <a href="https://twitter.com/reactjs?ref_src=twsrc%5Etfw">@reactjs</a> code last week, our checkout process.<a href="https://t.co/KUInwsCmAF">https://t.co/KUInwsCmAF</a></p>&mdash; Brian Holt (@holtbt) <a href="https://twitter.com/holtbt/status/493852312604254208?ref_src=twsrc%5Etfw">July 28, 2014</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I went on to write React at a variety of large companies and it's been my goto tool for over a decade at this point. It's safe to say it's been a defining feature in my career.

I currently work as a staff product manager at [Neon][neon] working on developer tools and developer experience. I loved working on dev tools and dev experiences so much that I ended up working in tools and strategy. Previous to Neon, I've worked at Snowflake, Microsoft, LinkedIn, Netflix, Reddit, and some other startups. I've done everything from VP of product to dev rel to staff engineering tech lead.

When I'm not working or teaching, you'll find me hanging out with my wife, son, and my soon-to-arrive daughter! I've lived the past six years in Seattle but I'm currently moving to Sacramento to get a bit more sun and to live close to amazing snowboarding in Tahoe! 🏂 I also enjoy hazy IPAs, Islay Scotches, road cycling, and playing Dota 2 poorly.

Please catch up with me on social media! Be aware that I'm awful at responding to DMs!!

- [Twitter][x]
- [Bluesky][bs]
- [LinkedIn][li]
- [GitHub][gh]

## Where to File Issues

I write these courses and take care to not make mistakes. However when teaching over ten hours of material, mistakes are inevitable, both here in the grammar and in the course with the material. However I (and the wonderful team at Frontend Masters) are constantly correcting the mistakes so that those of you that come later get the best product possible. If you find a mistake we'd love to fix it. The best way to do this is to [open a pull request or file an issue on the GitHub repo][issues]. While I'm always happy to chat and give advice on social media, I can't be tech support for everyone. And if you file it on GitHub, those who come later can Google the same answer you got.

## How the repo works

There are two repos for this class: [the website you're currently on][site] and [the example projects][projects]. To get set up, clone or [download][zip] the projects repo:

```bash
git clone https://github.com/btholt/citr-v9-project.git
```

Every step of this project will have a folder that will be a snapshot of where the project is at that step. If you get stuck, want to copy/paste some long bit of code you don't feel like writing, or just want to walk through the code at that point, please do! The primary goal of this is for you to learn so as long as you're learning there's no cheating!

The naming format will be `XX-<name of the lesson>` so you can get a rough idea of order and which lesson the step is coming from. In each snapshot you'll have to run `npm install` again since they are another whole copy of the project.

We're going to be starting from scratch, but you'll need the repo downloaded because there's an `api` directory that will be used later in the course.

> And one last request! [Please star this repo][site]. It helps the course be more discoverable and with my fragile ego.

[x]: https://twitter.com/holtbt
[bs]: https://bsky.app/profile/brianholt.me
[li]: https://www.linkedin.com/in/btholt/
[gh]: https://github.com/btholt
[site]: https://github.com/btholt/complete-intro-to-react-v9
[projects]: https://github.com/btholt/citr-v9-project
[issues]: https://github.com/btholt/complete-intro-to-react-v9/issues
[neon]: https://neon.tech/
[zip]: https://github.com/btholt/citr-v9-project/archive/refs/heads/main.zip