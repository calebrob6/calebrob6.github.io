---
title: "Countries of the world quiz"
date: 2019-01-28 00:00:00 -0800
permalink: /games/2019/01/28/countries-of-the-world-quiz.html
tags:
  - games
---

I reimplemented Sporcle's [Countries of the World Map Quiz](https://www.sporcle.com/games/g/world) using [Leaflet](https://leafletjs.com/) and some world country datasets. Check it out [here](http://calebrob.com/countries-of-the-world-quiz/)! The code is up on [github](https://github.com/calebrob6/countries-of-the-world-quiz); feel free to send a pull request or email if you would like me to add a country name alias!

### Backstory

My labmates and I occasionally take a ~15 minute break from research by jointly tackling the previously mentioned Sporcle quiz. Our score has been monotonically increasing over the past few weeks (we got 90% completion this past Friday), but I imagine we'll struggle a little before getting to 100%. The low-resolution, static, Sporcle map interface makes this task more challenging as the country labels don't always match up with their country's location, meaning you can't easily see which countries you are missing labels for ("which south Pacific islands have we said again!?"). My implementation (a few hour break from research) with Leaflet simply lets you scroll around the Earth, Google Maps style. This lets you know exactly where that last country in the Middle East is, that: "I swear starts with an 'Az'", but, "maybe a 'B'", and "is east of 'Saudi Arabia'", but, "isn't the 'UAE'", and, "oh no we only have 5 seconds left!". 
