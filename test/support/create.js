import { expect } from 'chai';

/** @typedef {import('../../base').Handlers} Handlers */

/**
 * @typedef {(html: string, handlers: Handlers) => any[]|DocumentFragment} Interpolate
 */

/**
 * @param {Interpolate} interpolate
 * @param {(tagName: any, props: object, children?: any) => any} h
 * @param {(element: any) => string} renderToString
 */
export function createTests(interpolate, h, renderToString) {
	describe('interpolate', () => {
		it('returns html string and escapes text without handler', () => {
			const element = interpolate('Hello <strong>world</strong>!', {});

			const rendered = renderToString(element);

			expect(rendered).to.equal('Hello &lt;strong&gt;world&lt;/strong&gt;!');
		});

		it('returns html string with nested tags', () => {
			const element = interpolate(
				' 0<a>1 <b>2 <c> 3 </c> <c a/> <d></d>4</b> 5</a>  6 ',
				{
					a: 'div',
					b: 'p',
					c: 'strong',
					d: 'em',
				}
			);

			const rendered = renderToString(element);

			expect(rendered).to.equal(
				' 0<div>1 <p>2 <strong> 3 </strong> <strong></strong> <em></em>4</p> 5</div>  6 '
			);
		});

		it('returns html string handled by component implementation', () => {
			const element = interpolate('Hello <replace-me>world</replace-me>!', {
				'replace-me': ({ children }) =>
					h('span', { 'data-replaced': 'true' }, children),
			});

			const rendered = renderToString(element);

			expect(rendered).to.equal(
				'Hello <span data-replaced="true">world</span>!'
			);
		});

		it('returns html string handled by string implementation', () => {
			const element = interpolate('Hello <replace-me>world</replace-me>', {
				'replace-me': 'strong',
			});

			const rendered = renderToString(element);

			expect(rendered).to.equal('Hello <strong>world</strong>');
		});

		it('removes empty text fragments', () => {
			const element = interpolate('<strong>Example</strong>', {
				strong: 'strong',
			});

			const rendered = renderToString(element);

			expect(rendered).to.equal('<strong>Example</strong>');

			if (/** @type {any[]} */ (element).length) {
				expect(element).to.have.lengthOf(1);
			}
		});

		it('ignores attributes in input text', () => {
			const element = interpolate('Hello <strong data-before>world</strong>', {
				strong: ({ children }) =>
					h('span', { 'data-replaced': 'true' }, children),
			});

			const rendered = renderToString(element);

			expect(rendered).to.equal(
				'Hello <span data-replaced="true">world</span>'
			);
		});

		it('is reasonable about tag names it accepts', () => {
			const original = '<a><b></b></a>><valueOf></valueOf>';
			const element = interpolate(original, {
				'a>': 'div',
				...'\\^$\\\\.*+?()[]{}|'
					.split('')
					.reduce(
						(obj, letter) => Object.assign(obj, { [letter]: 'span' }),
						{}
					),
			});

			const rendered = renderToString(element);

			expect(rendered).to.equal(renderToString(original));
		});

		it('renders the kitchen sink readme example', () => {
			const HelpCenterIcon = () =>
				h('span', { 'data-help-center-icon': 'true' });

			const element = interpolate(
				'<strong>If you need help</strong>, visit our <a><HelpCenterIcon /> Help Center</a>.',
				{
					strong: 'strong',
					HelpCenterIcon: HelpCenterIcon,
					a: h('a', { href: '/help' }),
				}
			);

			const rendered = renderToString(element);

			expect(rendered).to.equal(
				'<strong>If you need help</strong>, visit our <a href="/help"><span data-help-center-icon="true"></span> Help Center</a>.'
			);
		});
	});
}
