import { jsx } from 'react/jsx-runtime.js';
import baseInterpolate from './base.js';

/** @typedef {import('./base').Handlers} Handlers */
/** @typedef {import('react').ReactNode} ReactNode */

/**
 * @type {(html: string, handlers: Handlers) => ReactNode[]}
 */
export var interpolate = baseInterpolate.bind(null, jsx);
