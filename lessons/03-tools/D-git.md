---
description: >-
  Learn how to efficiently set up a Git repository, create a .gitignore file,
  and manage untracked files in your project as part of the Complete Intro to
  React v9 course by Brian Holt. Enhance your Git skills with practical tips,
  ensuring a clean and professional project environment. For more detailed
  instruction, explore ThePrimeagen's Git course on Frontend Masters.
keywords:
  - Git setup
  - Git repository
  - .gitignore
  - Front End Masters
  - frontend development
---

Git is a critical part of any project and probably something many of you are already familiar with. If you haven't, be sure to initialize your project as a git repo with `git init` in the root of your project (VSCode and any other number of tools can do this as well.)

If you haven't already, create a .gitignore at the root of your project to ignore the stuff we don't want to commit. Go ahead and put this in there:

```
node_modules
dist/
.env
.DS_Store
coverage/
.vscode/
```

This will make it so these things won't get added to our repo. If you want more Git instruction, please check out [ThePrimeagen's course on Frontend Masters][prime].

[prime]: https://frontendmasters.com/courses/everything-git/
