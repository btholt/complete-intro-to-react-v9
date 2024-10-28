---
title: npm
description: >-
  Learn about npm and pnpm, two essential package managers for Node.js, as you
  embark on your React development journey with Brian Holt's Complete Intro to
  React, v9. This section guides you through setting up npm projects and
  understanding the differences between npm and pnpm, enhancing your knowledge
  of JavaScript development tools.
keywords:
  - npm
  - pnpm
  - Node.js
  - React development
  - JavaScript tools
---

## npm

npm does not stand for Node.js Package Manager. It is, however, the package manager for Node.js (they don't say what it stands for). It also has all the packages in the front end scene. npm makes a command line tool, called `npm` as well. `npm` allows you to bring in code from the npm registry which is a bunch of open source modules that people have written so you can use them in your project. Whenever you run `npm install react` (don't do this yet), it will install the latest version of React from the registry.

In order to start an npm project, run `npm init -y` at the root of your project. If you don't have Node.js installed, [please go install that too][node]. When you run `npm init` it'll ask you a bunch of questions. If you don't know the answer or don't care, just hit enter. You can always modify package.json later. This will allow us to get started installing and saving packages.

## pnpm

Another option here is to use [pnpm][pnpm]. pnpm is a newer package manager that makes different tradeoffs than npm, notably how it chooses to organize the node_modules directory. npm maintains a flat file structure and installs everything flat whereas pnpm does more symlinking. Both are fine, feel free to choose what works for you. I'll be using npm because it's easier for students to use.

[pnpm]: https://pnpm.io/motivation
[node]: https://nodejs.org/en
