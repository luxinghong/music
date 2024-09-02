export function formatNumber(num: number) {
    if (num < 99999) {
        return num.toString();
    }
    if (num < 100000000) {
        return Math.round(num / 10000) + '万';
    }
    if (num >= 100000000) {
        return Math.round(num / 10000) + '万';
    }
    return num.toString();
}