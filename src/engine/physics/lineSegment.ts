import { Vector2, normalize, dot, lerpClamped, distance, sub } from '../vector';

export interface LineSegment {
    point1: Vector2
    point2: Vector2

    // Derivatives
    lengthSq: number
    length: number
    normal: Vector2
}

export function createLineSegment(point1: Vector2, point2: Vector2): LineSegment {
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    const lengthSq = dx * dx + dy * dy;

    return {
        point1,
        point2,
        lengthSq,
        length: Math.sqrt(lengthSq),
        normal: normalize([ dy, -dx ]),
    };
}

export function projectOntoLineSegmentClamped(point: Vector2, segment: LineSegment): Vector2 {
    const startToPoint = sub(point, segment.point1);
    const d = sub(segment.point2, segment.point1);

    const projT = dot(startToPoint, d) / segment.lengthSq;

    return lerpClamped(segment.point1, segment.point2, projT);
}

export function minimalDistanceToSegment(point: Vector2, segment: LineSegment): number {
    return distance(point, projectOntoLineSegmentClamped(point, segment));
}