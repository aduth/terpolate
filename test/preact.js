import { h } from 'preact';
import { renderToString } from 'preact-render-to-string';
import { interpolate } from '../preact.js';
import { createTests } from './support/create.js';

describe('preact', () => {
	createTests(interpolate, h, renderToString);
});
