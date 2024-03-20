---
title: "Accrete solar system simulator"
date: 2013-10-07 00:00:00 -0800
permalink: /javascript/archived/2013/10/07/accrete-simulator.html
tags:
  - javascript
  - archived
---

*Note*: this post was imported from the first version of my blog.


I converted the [Accrete Solar System Simulator](http://sourceforge.net/projects/accrete/) to pure javascript in two different ways: with the emscripten compiler and manually. See the original project code [here](http://sourceforge.net/p/accrete/code/?source=navbar), and my converted version [here](https://github.com/calebrob6/accrete).


### Emscripten Conversion

The [emscripten compiler](https://github.com/kripken/emscripten) is pretty awesome; it a cross compiler from C/C++ to JavaScript. It uses the llvm framework to convert C code to llvm bytecode which emscripten then compiles to native Javascript. Suprisingly this wasn't difficult to use. I used Ubuntu 12.10 and had to follow the instructions [here](https://earthserver.com/Setting_up_emscripten_development_environment_on_Linux) to set up emscripten. This involved compiling NodeJS and LLVM from source because emscripten depended on newer versions that weren't in the 12.10 repos. After emscripten was setup, it was trivial to compile the original accrete project with `emcc -O2 accrete.c display.c enviro.c main.c utils.c mtrng.c -o accrete.js`.

The only changes I had to make were in `display.c`, where I directed all fprintf output to stdout instead file (so that it can be captured as a variable in Javascript).


### Manual Conversion

The main issues that I had when manually converting the to JavaScript was with C pointers. In JavaScript everything but objects are passed by value to other methods, thus, in the conversion, I had to wrap every variable that is passed by reference inside of an object then pass that object. Luckily, in the original source, pointers are only used in several places. After converting the project line by line I did some refactoring.

Both versions of the project can be found in [this Github repository](https://github.com/calebrob6/accrete).

