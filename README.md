# react-animate-text

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-animate-text
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-animate-text.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-animate-text.svg
[build-status-url]:https://github.com/moxystudio/react-animate-text/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-animate-text/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-animate-text
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-animate-text/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-animate-text
[david-dm-image]:https://img.shields.io/david/moxystudio/react-animate-text.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-animate-text?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-animate-text.svg

A react component that animates text per word and/or per line.

## Installation

```sh
$ npm install @moxy/react-animate-text
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

Many projects share the necessity of having animated text, so creating a component for that every time is a waste. This component offers a flexible solution to animate text that you can easily integrate and use in your project.

## Usage

```js
import React from 'react';
import AnimateText from '@moxy/react-animate-text';

const MyComponent = (props) => (
    <div className="container">
        <AnimateText initialDelay={ 0.5 } wordDelay={ 0.5 }>
            Lorem ipsum dolor sit amet.
        </AnimateText>
    </div>
);

export default MyComponent;
```

The `AnimateText` component uses the [`@moxy/react-split-text`](https://github.com/moxystudio/react-split-text) to split the text.

To import the stylesheet, one can import it on the project's entry CSS file:

```css
@import "@moxy/react-animate-text/dist/index.css";
```

Or in the project's entry JavaScript file:

```js
import "@moxy/react-animate-text/dist/index.css";
```

## API

These are the props available in `@moxy/react-animate-text`.

#### children

Type: `string` | Required: `true`

Text to be split and animated.

#### separator

Type: `string` | Required: `false` | Default: `non-breaking space`

The pattern describing where each split should occur, just like the one from `String.prototype.split()`.

#### className

Type: `string` | Required: `false`

A className to apply to the container.

#### show

Type: `boolean` | Required: `false`

By default this component only shows the text (and triggers the animation) when it is visible within the viewport, with the help of the [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver). With this prop you can control when the text is shown, ignoring the default behavior.

#### transitionDuration

Type: `number` | Required: `false` | Default: `0.8`

The transition duration in seconds for each animation.

#### initialDelay

Type: `number` | Required: `false` | Default: `0`

The initial delay in seconds for the animations to start.

#### lineDelay

Type: `number` | Required: `false` | Default: `0.3`

The delay in seconds for the animations between lines.

#### wordDelay

Type: `number` | Required: `false` | Default: `0`

The  delay in seconds for the animations between words.

## Styling

In case you want to change the animation of each word there are data attributes that help you do that:

```css
.container {
    & [data-attribute="word"] {
        transform: translate3d(100%, 0, 0);
    }

    &[aria-hidden="false"] {
        & [data-attribute="word"] {
            transform: translate3d(0, 0, 0);
        }
    }
}
```

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `react-animate-text` project with:

```sh
$ npm run build
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo. While developing, it may be a good idea to run the `dev` script, so you won't need to manually run the build after every change*

```sh
$ npm run dev
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

## FAQ

### I can't override the component's CSS, what's happening?

There is an ongoing [next.js issue](https://github.com/zeit/next.js/issues/10148) about the loading order of modules and global CSS in development mode. This has been fixed in [v9.3.6-canary.0](https://github.com/zeit/next.js/releases/tag/v9.3.6-canary.0), so you can either update `next.js` to a version higher than `v9.3.5`, or simply increase the CSS specificity when overriding component's classes, as we did in the [`demo`](./demo/pages/index.module.css), e.g. having the page or section CSS wrap the component's one.

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
