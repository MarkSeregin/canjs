# [CanJS](https://canjs.com/) — Build apps in fewer lines of code with a powerful model layer

[Learn how to build an app](https://canjs.com/doc/guides/crud-beginner.html)

[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/can.svg)](https://www.npmjs.com/package/can)
[![Build Status](https://travis-ci.org/canjs/canjs.svg?branch=master)](https://travis-ci.org/canjs/canjs)
[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/canjs.svg)](https://greenkeeper.io/)

## Model layer

Components shouldn’t be concerned with how data is fetched, updated, or cached.

CanJS provides the right abstractions for your model code to be cleanly separated from your UI code. [Learn more…](./readme-feature-model-layer.md)

<img src="https://canjs.com/docs/images/animations/model-layer-still.svg" width="270" />

## Runtime type safety

CanJS helps you define custom object types and specify rules for type checking and conversion.

This adds safety to your code by ensuring values are always the type you expect, even when the values come from a backend API. [Learn more…](./readme-feature-safety.md)

```js
import { ObservableObject } from "can/everything";

class Scientist extends ObservableObject {
  static props = {
    name: String,
    occupation: String
  };

  get title() {
    return `${this.name}: ${this.occupation}`;
  }
}
```

## Real-time list updating

After data is created, updated, or destroyed, CanJS automatically updates your lists for you.

Filtering and sorting are preserved, so you don’t have to manually update your lists or fetch the same data again. [Learn more…](./readme-feature-real-time-list-updating.md)

<img src="https://canjs.com/docs/images/animations/realtime-amin.svg" width="270" />

## [Take the Tutorial](https://canjs.com/doc/guides/crud-beginner.html)

Learn how to build a basic app with CanJS in 30 minutes.

## We have your back

CanJS is backed by [Bitovi](https://www.bitovi.com/), a company built on using and publishing open source software. We answer every question on [our Slack](https://bitovi.com/community/slack) and [our Discourse forums](https://forums.bitovi.com/). We want to help you get started with CanJS!

<a href="https://bitovi.com/community/slack"><img src="https://canjs.com/docs/images/logos/slack.svg" width="160" /></a>

<a href="https://forums.bitovi.com/"><img src="https://canjs.com/docs/images/logos/discourse.svg" width="160" /></a>

## Get started with just a few lines of code

Below is an entire app that shows off some of the best features of CanJS:

- One line of code to create a model from the data returned by a backend API (with [realtimeRestModel](https://canjs.com/doc/can-realtime-rest-model.html)).
- The `props` include rules for type checking and conversion (with [type](https://canjs.com/doc/can-type.html)).
- When you add a to-do, it automatically gets inserted into the list in the right position.

Example on CodePen: https://codepen.io/bitovi/pen/dBawyZ

*Type in a new to-do and click “Add” to see it appear in the list. Notice that new to-dos are inserted in alphabetical order, without any code that explicitly inserts the new one in the right place!*

[Learn how to build an app](https://canjs.com/doc/guides/crud-beginner.html)

## [Who uses CanJS?](https://canjs.com/doc/guides/who-uses-canjs.html)

<img height="27" src="https://canjs.com/docs/images/logos/apple.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/hp.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/bitovi.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/fedex.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/tucows.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/chase.svg" />
<img height="27" src="https://canjs.com/docs/images/logos/delta.svg" />

## Use DevTools to debug your app

Use the CanJS DevTools to edit your app’s state at runtime, visualize the dependency graphs between elements and state, and debug changes to observables.

## Small bundle size

At 72 KB gzipped, CanJS provides all the tools you need at a small size. 📦

## Browser support

CanJS supports all modern browsers: Chrome, Edge, Firefox, and Safari.

[![Sauce Test Status](https://saucelabs.com/browser-matrix/canjs-not-master.svg)](https://saucelabs.com/u/canjs-not-master)

## [Take the Tutorial](https://canjs.com/doc/guides/crud-beginner.html)

Learn how to build a basic app with CanJS in 30 minutes.