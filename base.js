/**
 * Component type.
 *
 * @typedef {(props: Props) => any} Component
 */

/**
 * Element instance.
 *
 * @typedef {{ type: string, props: Props }} Element
 */

/**
 * Props object.
 *
 * @typedef {Record<string, *>} Props
 */

/**
 * Handler implementation.
 *
 * @typedef {Component|string|Element} Handler
 */

/**
 * Object of replacement handlers.
 *
 * @typedef {Record<string, Handler>} Handlers
 */

/**
 * Assign all properties for source object into the target. Mutates target.
 *
 * @param {Record<string,*>} target
 * @param {Record<string,*>} object
 */
export function assign(target, object) {
	for (var key in object) {
		target[key] = object[key];
	}
}

/**
 * Push value into array if value is truthy.
 *
 * @param {Array<*>} array
 * @param {*} value
 */
export function push(array, value) {
	if (value) {
		array.push(value);
	}
}

/**
 * Given an HTML string and an object of tag names to component or element,
 * returns an array of nodes where the mapped tag names are replaced by the
 * resulting element of the rendered component.
 *
 * @template {(type: any, props: object, key?: any) => any} JSX
 *
 * @param {JSX} jsx JSX implementation.
 * @param {string} html HTML to format.
 * @param {Handlers} handlers Mapping of tag names to tag name or component.
 *
 * @return {ReturnType<JSX>}
 */
function interpolate(jsx, html, handlers) {
	var pattern = /<([\w-]+).*?(?:\/>|>(.*?)<\/\1>)/gi,
		result = [],
		lastIndex = 0,
		match;

	while ((match = pattern.exec(html))) {
		var tag = match[1];
		if (!handlers.hasOwnProperty(tag)) {
			continue;
		}

		var matchedText = match[0],
			content = match[2],
			handler = handlers[tag],
			isElement = /** @type {Element} */ (handler).type,
			props = /** @type {Props} */ ({}),
			type = isElement
				? /** @type {Element} */ (handler).type
				: /** @type {Exclude<Handler, Element>} */ (handler);

		if (content) {
			props.children = interpolate(jsx, content, handlers);
		}

		if (isElement) {
			assign(props, /** @type {Element} */ (handler).props);
		}

		push(result, html.slice(lastIndex, match.index));
		lastIndex = match.index + matchedText.length;
		result.push(jsx(type, props, match.index));
	}

	push(result, html.slice(lastIndex));

	return /** @type {ReturnType<JSX>} */ (result);
}

export default interpolate;
