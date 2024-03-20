---
title: "Anonymous inner functions in JavaScript"
date: 2013-10-15 00:00:00 -0800
permalink: /javascript/archived/2013/10/15/javascript-anonymous-functions.html
tags:
  - javascript
  - archived
excerpt: ""
---

*Note*: this post was imported from the first version of my blog.


In JavaScript you can create anonymous functions that execute immediately and pass arguments to themselves, more formally known as "Self-Executing Anonymous Inner Functions".

Take this function for example:

```js
(function(msg){
    console.debug(msg);
})("Testing");
```

Whatever is inside of the anonymous function is completely hidden from the global scope, but can use whatever you pass into it. Using an anonymous function like this, you can "remember" a piece of the outer scope by returning a function to be executed:

```js
rememberedScope = (function(scope){
    return function(){
        scope.doSomethingWithReferrenceToThis();
    }
 })(this)
```

In this example `rememberedScope` is a function that "knows" about a variable from the scope in which it was created.

I have found this useful for maintaining the `this` object through a call to `window.setTimeout()`. The first argument for `window.setTimeout` is the function that is to be run in the number of milliseconds given by the second argument. Code such as `window.setTimeout(this.doSomething(), 10)` will not work because "this" is lost when executed by `setTimeout`. By using the above pattern we can avoid this problem as follows:

```js
window.setTimeout( 
(function(scope){
    return function(){
        scope.doSomethingWithReferrenceToThis();
    }
 })(this), 10)
 ```

See more about how the JQuery library uses this pattern [here](https://www.paulirish.com/2010/10-things-i-learned-from-the-jquery-source/).