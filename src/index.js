import yaml from 'yaml';
import swinebouk from 'swinebouk';

import SvgVowelChart from './svg-vowel-chart';

const {parse: parseYaml} = yaml;
const {InputParser} = swinebouk;

function getInput() {
	const text = document.getElementById('swinebouk-input').value;
	return parseYaml(text);
}

function vowelChartSvg() {
	const vowelList = new InputParser().parse(getInput());
	const element = new SvgVowelChart().render(vowelList);
	element.id = 'svg-output';
	document.body.appendChild(element);
}

vowelChartSvg();
