---
description: >-
  Explore essential tools and configurations for the "Complete Intro to React
  v9" course by Brian Holt, including recommended Node.js version, Visual Studio
  Code setup with extensions, and terminal preferences for optimal React
  development experience. Learn about the use of tools like fnm for Node.js,
  Starship Prompt, MonoLisa font, and more within this comprehensive React
  course.
keywords:
  - Brian Holt
  - React
  - Node.js
  - Visual Studio Code
  - Starship Prompt
---

## Node.js

You'll need to have a Node.js version installed, and preferably something after v20.16. I wrote this course with 20.16 but it should be fairly future-proof.

I use [fnm][fnm] to manage my Node.js versions (similar to nvm).

I _think_ this course would work with recent versions of [bun][bun] or [deno][deno] but it's untested. Beware if you decide go down this path.

## Tools FAQ

### What tools are your using?

- Visual Studio Code – I used to work at Microsoft on VS Code so it's no surprise that I'll be using it in this course. We'll also be using a few extensions that I'll call out as we get there.
- Firefox – I want more than Chromium to exist so I support Firefox where I can. Feel free to use any browser; it won't matter in this course.
- Terminal.app – I used to use iTerm2 and Hyper but in the end I appreciate how fast the default terminal is.

### What <font/theme/extension> are you using?

- Visual Studio Code
  - Dark+ Theme – It comes installed by default but it's not the default theme anymore. I'm so used to it that I can't switch.
  - [MonoLisa][monolisa] font – I like fonts and I look at it all day so I was okay paying for it. I have [ligatures][ligatures] enabled which is why you might see strange glyphs. If you want ligatures but don't want to pay, the linked ligature article has a few. I like Cascadia Code from Microsoft.
  - [vscode-icons][vscode-icons] – Lots of neat icons for VS Code and it's free.
- Terminal
  - zsh – It comes with macOS now and I'm _way_ too lazy to switch back to bash.
  - [Dracula theme][dracula] – I like the pastels. I would use it in VS Code too if Dark+ wasn't ingrained in my blood.
  - [Starship Prompt][starship] – Very cool prompt that's just pretty. Also shows you what sort of project you're in which is occasionally useful
  - [CaskaydiaCove Nerd Font][nerd] – This works with Starship prompt to give you the JS logos and all those extra glyphs. It's based on Cascadia Code.

[ligatures]: https://worldofzero.com/posts/enable-font-ligatures-vscode/
[monolisa]: https://www.monolisa.dev/
[vscode-icons]: https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons
[dracula]: https://draculatheme.com/terminal
[starship]: https://starship.rs/
[nerd]: https://www.nerdfonts.com/font-downloads
[fnm]: https://github.com/Schniz/fnm
[bun]: https://bun.sh/
[deno]: https://deno.com/
