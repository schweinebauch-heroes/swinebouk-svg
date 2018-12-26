import yaml from 'yaml';
import swinebouk from 'swinebouk';

import SvgVowelChart from '../lib/svg-vowel-chart';

import baseStyle from './base-style.css';

import 'modern-normalize/modern-normalize.css';

const {parse: parseYaml} = yaml;
const {InputParser} = swinebouk;

function getInput() {
	const text = document.getElementById('swinebouk-input').value;
	return parseYaml(text);
}

function vowelChartSvg() {
	const vowelList = new InputParser().parse(getInput());
	const element = new SvgVowelChart().render(vowelList, baseStyle.toString());
	element.id = 'svg-output';
	element.setAttribute('version', '1.1');
	element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	document.body.appendChild(element);

	const image = document.createElement('img');
	image.setAttribute('src', 'data:image/svg+xml;charset=utf-8,' + element.outerHTML);
	//
	// // downloadLink.setAttribute('href', );
	// // downloadLink.text = 'Download';
	document.body.appendChild(image);
}

vowelChartSvg();
