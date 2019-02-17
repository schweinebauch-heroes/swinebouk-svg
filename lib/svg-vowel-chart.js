const Snap = require('snapsvg/dist/snap.svg.js');

class SvgVowelChart {
	constructor(
		options = {
			padding: 0.2, // Percentage
			heightRatio: 0.75, // Height relative to the top line
			lowerWidthRatio: 0.3, // Length of bottom line relative to top line
			vowelMarker: '•'
		}
	) {
		this._opts = options;
	}

	render(vowelList, style = '') {
		const normalizedVowelList = {...vowelList};
		const element = document.createElement('svg');
		element.setAttribute('viewbox', '0 0 100 100');

		if (style) {
			element.appendChild(createStyleElement(style));
		}

		element.classList.add('vowel-outer-svg');
		const outerSvg = new Snap(element);
		const innerSvg = this._createInnerSvg(outerSvg);
		this._drawFrame(innerSvg);
		this._drawVowels(innerSvg, normalizedVowelList);
		return element;
	}

	get _upperWidth() {
		return 120;
	}

	get _height() {
		this.__height = this.__height || this._upperWidth * this._opts.heightRatio;
		return this.__height;
	}

	get _lowerWidth() {
		this.__lowerWidth = this.__lowerWidth || this._upperWidth * this._opts.lowerWidthRatio;
		return this.__lowerWidth;
	}

	_createInnerSvg(outerSvg) {
		const {padding} = this._opts;
		const minX = -this._upperWidth - (this._upperWidth * padding);
		const minY = -this._height - (this._upperWidth * padding);
		const width = this._upperWidth + (2 * this._upperWidth * padding);
		const height = this._height + (2 * this._upperWidth * padding);
		const innerSvg = outerSvg.svg(
			0, 0, '100%', '100%', minX, minY, width, height
		);
		innerSvg.addClass('vowel-inner-svg');
		return innerSvg;
	}

	_drawFrame(svg) {
		svg.polygon(
			0, 0, 0, -this._height, -this._upperWidth, -this._height, -this._lowerWidth, 0
		).addClass('vowel-frame');
		svg.line(
			-this._lowerWidth / 2, 0, -this._upperWidth / 2, -this._height
		).addClass('vowel-inner-frame');
		[
			1 / 3, 2 / 3
		].forEach(close => {
			const v1 = {front: 0, close};
			const v2 = {front: 1, close};
			svg.line(
				this._vowelX(v1), this._vowelY(v1), this._vowelX(v2), this._vowelY(v2)
			).addClass('vowel-inner-frame');
		});
	}

	_drawVowels(svg, normalizedVowelList) {
		normalizedVowelList.vowels.forEach((v, i) => this._drawVowel(svg, v, i));
	}

	_drawVowel(svg, vowel, index) {
		const x = this._vowelX(vowel);
		const y = this._vowelY(vowel);
		this._drawMarker(svg, x, y);
		const label = svg.text(x, y, vowel.label).attr({id: `vowel-${index}`});
		label.addClass(`vowel-label ${vowel.round ? 'vowel-label-rounded' : 'vowel-label-unrounded'}`);
	}

	_vowelX({front, close}) {
		return -(front * (this._lowerWidth + (close * this._upperWidth * (1 - this._opts.lowerWidthRatio))));
	}

	_vowelY({close}) {
		return -(close * this._height);
	}

	_drawMarker(svg, x, y, round) {
		const extraClass = round === true ? 'vowel-marker-rounded' :
			(round === false ? 'vowel-marker-unrounded' : null);
		const circle = svg.circle(x, y, '0.15em').addClass('vowel-marker');
		if (extraClass !== null) {
			circle.addClass(extraClass);
		}
	}
}

function createStyleElement(content) {
	const template = document.createElement('template');
	template.innerHTML = `<style type="text/css">${content}</style>`;
	return template.content.firstChild;
}

module.exports = SvgVowelChart;
