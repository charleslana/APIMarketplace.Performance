import http from 'k6/http';
import {verifyResponse} from './validation.js';
import {metrics, recordMetrics} from './metrics.js';
import {headersUtils} from '../utils/headers-utils.js';
import {logger} from '../utils/utils.js';
import {sleep} from 'k6';

export function makeRequest(method, url, body = null, headers = headersUtils, maxDuration = 2000) {
    logger('req', url, body, headers);
    const options = {headers};
    let res;

    switch (method.toUpperCase()) {
        case 'GET':
            res = http.get(url, options);
            break;
        case 'POST':
            res = http.post(url, body, options);
            break;
        case 'PUT':
            res = http.put(url, body, options);
            break;
        case 'PATCH':
            res = http.patch(url, body, options);
            break;
        case 'DELETE':
            res = http.del(url, options);
            break;
        default:
            throw new Error(`Método HTTP não suportado: ${method}`);
    }

    const {checksPassed, failed} = verifyResponse(res, maxDuration);
    recordMetrics(res, metrics, failed);
    logger('res', null, null, null, res.status, res.body);
    sleep(1);
    return res;
}