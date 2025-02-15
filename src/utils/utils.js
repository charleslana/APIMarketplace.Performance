export function getBaseUrl() {
    const env = __ENV.ENV;
    if (env === 'prod') {
        return 'https://virtserver.swaggerhub.com/rockencantech-67e/MarketplaceAPI/1.0.0';
    }
    return 'https://virtserver.swaggerhub.com/rockencantech-67e/MarketplaceAPI/1.0.0';
}

export function generateRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let emailPrefix = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
        emailPrefix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${emailPrefix}@email.com`;
}

export function generateCPF(withPoints = false) {
    const base = Array.from({length: 9}, randomDigit).join('');
    const firstDigit = calculateDigit(base);
    const secondDigit = calculateDigit(base + firstDigit);
    const cpf = `${base}${firstDigit}${secondDigit}`;
    if (withPoints) {
        return formatNumber(cpf, {regex: /(\d{3})(\d{3})(\d{3})(\d{2})/, format: '$1.$2.$3-$4'});
    }
    return cpf;
}

export function generateCNPJ(withPoints = false) {
    const base = Array.from({length: 8}, randomDigit).join('') + '0001';
    const firstDigit = calculateDigit(base, true);
    const secondDigit = calculateDigit(base + firstDigit, true);
    const cnpj = `${base}${firstDigit}${secondDigit}`;
    if (withPoints) {
        return formatNumber(cnpj, {regex: /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, format: '$1.$2.$3/$4-$5'});
    }
    return cnpj;
}

export function logger(type, path, jsonData, headers, status, body) {
    const hasLog = __ENV.HAS_LOG === 'true';
    if (hasLog) {
        if (type === 'req') {
            console.log(path);
            console.log(jsonData);
            console.log(headers);
        } else if (type === 'res') {
            console.log(status);
            console.log(body);
        }
    }
}

export function buildCookiesString(cookies) {
    return Object.entries(cookies)
        .map(([key, valueArray]) => {
            const validValue = valueArray.find(cookie => cookie.value && cookie.value.trim() !== '');
            return validValue ? `${key}=${validValue.value}` : null;
        })
        .filter((cookie) => cookie !== null)
        .join('; ');
}

function randomDigit() {
    return Math.floor(Math.random() * 10);
}

function calculateDigit(base, isCNPJ = false) {
    let weight = isCNPJ ? base.length - 7 : base.length + 1;
    let sum = 0;
    for (const element of base) {
        sum += parseInt(element) * weight--;
        if (isCNPJ && weight < 2) weight = 9;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

function formatNumber(number, pattern) {
    return number.replace(pattern.regex, pattern.format);
}