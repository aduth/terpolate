import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server.js';
import { interpolate } from '../react.js';
import { createTests } from './support/create.js';

describe('react', () => {
	createTests(interpolate, createElement, renderToStaticMarkup);
});
