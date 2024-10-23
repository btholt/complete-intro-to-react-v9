---
description: >-
  Learn the essentials of initializing and setting up a project with Git,
  including creating a .gitignore file to exclude unnecessary files from your
  repository. Utilize resources like ThePrimeagen's course on Frontend Masters
  for comprehensive Git knowledge.
keywords:
  - Git
  - git init
  - .gitignore
  - Git tutorial
  - Frontend Masters
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
