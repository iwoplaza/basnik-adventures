export type Vector2 = [ number, number ];

export function lengthSq(vector: Vector2): number {
    return vector[0] * vector[0] + vector[1] * vector[1];
}

export function length(vector: Vector2): number {
    return Math.sqrt(lengthSq(vector));
}

export function distanceSq(a: Vector2, b: Vector2): number {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return dx * dx + dy * dy;
}

export function distance(a: Vector2, b: Vector2): number {
    return Math.sqrt(distanceSq(a, b));
}

export function normalize(vector: Vector2): Vector2 {
    const len = length(vector);

    return [
        vector[0] / len,
        vector[1] / len,
    ];
}

export function dot(a: Vector2, b: Vector2): number {
    return a[0] * b[0] + a[1] * b[1];
}

export function lerp(a: Vector2, b: Vector2, t: number): Vector2 {
    return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
    ];
}

export function lerpClamped(a: Vector2, b: Vector2, t: number): Vector2 {
    return lerp(a, b, Math.max(0, Math.min(t, 1)));
}

export function sub(a: Vector2, b: Vector2): Vector2 {
    return [
        a[0] - b[0],
        a[1] - b[1],
    ];
}

export function add(a: Vector2, b: Vector2): Vector2 {
    return [
        a[0] + b[0],
        a[1] + b[1],
    ];
}

export function scale(a: Vector2, scalar: number): Vector2 {
    return a.map(_ => _ * scalar) as Vector2;
}