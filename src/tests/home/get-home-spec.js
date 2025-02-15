import {makeRequest} from '../../config/request.js';
import {getBaseUrl} from '../../utils/utils.js';
import {group} from 'k6';
import {Trend} from 'k6/metrics';

const tempoExecucao = new Trend('te_home');

export default function (data) {
    const channelName = 'channelName';
    const path = `/v1/home/${channelName}`;
    const url = `${getBaseUrl()}${path}`;

    group(`Retorna os dados da home para o canal especificado. | URL: ${url}`, () => {
        const res = makeRequest('GET', url);
        tempoExecucao.add(res.timings.duration);
    });
}