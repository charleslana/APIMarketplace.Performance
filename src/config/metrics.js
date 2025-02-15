import {Counter, Rate, Trend} from 'k6/metrics';

export const metrics = {
    duration: new Trend('request_duration'),
    failRate: new Rate('request_fail_rate'),
    successRate: new Rate('request_success_rate'),
    totalReqs: new Counter('total_requests'),
    errorReqs: new Counter('request_errors'),
    errors: new Counter('errors'),
    apdex: new Trend('apdex_score'),
    totalExecutionTime: new Trend('total_execution_time'),
};

let accumulatedTime = 0;

export function recordMetrics(res, metrics, failed) {
    metrics.duration.add(res.timings.duration);
    metrics.totalReqs.add(1);
    metrics.failRate.add(failed);
    metrics.successRate.add(!failed);
    if (failed) {
        metrics.errorReqs.add(1);
        metrics.errors.add(1);
    }
    calculateApdex(res, metrics.apdex);
    calculateTotalTime(res, metrics.totalExecutionTime);
}

function calculateApdex(res, apdex) {
    const apdexT = 500;
    const time = res.timings.duration;
    if (time <= apdexT) {
        apdex.add(1);
        return;
    }
    if (time <= 4 * apdexT) {
        apdex.add(0.5);
        return;
    }
    apdex.add(0);
}

function calculateTotalTime(res, totalExecutionTime) {
    accumulatedTime += res.timings.duration;
    totalExecutionTime.add(accumulatedTime);
}