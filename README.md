# Terpolate

String interpolation for React, Preact, and plain DOM.

Why use Terpolate?

- 🔬 **Small**: Around 0.3kb gzipped before factoring in React or Preact.
- 🔒 **Safe**: Builds an element tree using only string content, never dangerous HTML.
- 📟 **Compatible:** Still supports outdated browsers such as Internet Explorer.

What are some use-cases?

- 🌍 Internationalization (i18n)
- 🧼 Simple HTML sanitization

## Installation

Install via NPM:

```
npm install terpolate
```

## Usage

The package exports a single function, `interpolate`:

```js
import { interpolate } from 'terpolate';
```

The function accepts two arguments:

1. A string with markup to replace
2. An object with markup tag component implementations

The return value is an element which can be included in the rendered value of your component.

For example:

```js
function Blink({ children }) {
	return <span class="blink">{children}</span>;
}

function Message() {
	const interpolated = interpolate('Hello <Blink>world</Blink>', { Blink });
	// ⇒ ['Hello ', <span class="blink">world</span>]

	return <div>{interpolated}</div>;
}
```

Handlers can be given as a string, component class or function, or as an element. When given as an element, the element is cloned with text inserted as children.

```js
interpolate(
	'<strong>If you need help</strong>, visit our <a><HelpCenterIcon /> Help Center</a>.',
	{
		strong: 'strong',
		HelpCenterIcon,
		a: <a href="/help" />,
	}
);
```

### Preact

All of the above still applies, but you should import from `terpolate/preact` instead:

```js
import { interpolate } from 'terpolate/preact';
```

### DOM

Similarly, import from `terpolate/dom`:

```js
import { interpolate } from 'terpolate/dom';
```

The return value is a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) which you can then append to a container:

```js
const link = document.createElement('a');
link.href = '/help';
const element = interpolate(
	'<strong>If you need help</strong>, visit our <a>Help Center</a>.',
	{
		strong: 'strong',
		a: link,
	}
);
document.body.appendChild(element);
```

Note that the DOM entrypoint assumes a DOM is present, meaning it should be run either in a browser or in a Node.js environment with a DOM global using a module like [`jsdom`](https://www.npmjs.com/package/jsdom).

## License

Copyright 2021 Andrew Duthie

Released under the [MIT License](./LICENSE.md).
