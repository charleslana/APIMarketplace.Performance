const abortFail = __ENV.ABORT_FAIL === 'true';
console.log('abortFail', abortFail);

export const thresholds = {
    http_req_duration: [
        {threshold: 'p(95)<2000', abortOnFail: false},  // 95% das requisições devem responder em até 2 segundos
        {threshold: 'p(90)<1500', abortOnFail: false}   // 90% das requisições devem responder em até 1.5 segundos
    ],
    http_req_failed: [{threshold: 'rate<0.01', abortOnFail: false}],    // máximo de 1% das requisições podem falhar
    checks: [{threshold: 'rate>0.5', abortOnFail: abortFail}], // aborta se menos de 50% dos checks passarem
    'te_home': [
        'p(95)<2000',   // 95% das requisições devem ser abaixo de 2000ms
        'p(90)<1500',   // 90% das requisições devem ser abaixo de 1500ms
        'avg<1000',     // A média deve ser abaixo de 1000ms
        'max<3000',     // O tempo máximo deve ser abaixo de 3000ms
        'med<1500',     // A mediana deve ser abaixo de 1500ms
        'min<1000'      // O tempo mínimo deve ser maior que 1000ms (isso é mais um check de integridade)
    ],
};