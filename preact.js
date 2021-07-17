import { jsx } from 'preact/jsx-runtime';
import baseInterpolate from './base.js';

/** @typedef {import('./base').Handlers} Handlers */
/** @typedef {import('preact').VNode} VNode */

/**
 * @type {(html: string, handlers: Handlers) => VNode[]}
 */
export var interpolate = baseInterpolate.bind(null, jsx);
