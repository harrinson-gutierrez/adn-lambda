export function is_Natural(n: number) {
    if (typeof n !== 'number')
        return 'Not a number';

    return (n >= 0.0) && (Math.floor(n) === n) && n !== Infinity;
}