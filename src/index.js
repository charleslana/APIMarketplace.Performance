import {htmlReport} from './libs/k6-reporter-bundle.js';
import {textSummary} from './libs/text-summary.js';
import {thresholds} from './config/thresholds.js';
import getHomeSpec from "./tests/home/get-home-spec.js";

console.log(__ENV.STAGES_SET);

let envStagesSet = null;

if (__ENV.STAGES_SET) {
    const object = __ENV.STAGES_SET
        .replace(/\s/g, '')
        .replace(/'/g, '"')
        .replace(/([{,])(\w+):/g, '$1"$2":')
        .replace(/:(\w+)/g, ':"$1"')
        .replace(/"(\d+)"}/g, '$1}')
        .replace(/"null"/g, null);
    console.log('object', object);
    envStagesSet = JSON.parse(object);
}

console.log('envStagesSet', envStagesSet);

const hasLog = __ENV.HAS_LOG === 'true';
console.log('hasLog', hasLog);

export function handleSummary(data) {
    console.log('Generating HTML report as \'summary.html\'...');
    return {
        'summary.html': htmlReport(data),
        stdout: textSummary(data, {indent: ' ', enableColors: true}),
    };
}

const fixedOptions = {
    vus: 5,
    iterations: 5,
    thresholds
};

const scaledOptions = {
    stages: envStagesSet ?? [],
    thresholds
};

export const options = (envStagesSet != null && envStagesSet.length !== 0) ? scaledOptions : fixedOptions;

export function setup() {
    return {
        token: null,
    };
}

export default (data) => {
    getHomeSpec(data);
};