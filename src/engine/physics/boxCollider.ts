import { Vector2 } from '../vector';
import { LineSegment, createLineSegment } from './lineSegment';

export interface BoxCollider {
    min: Vector2
    max: Vector2
}

export function lineSegmentsFromBoxCollider(box: BoxCollider): LineSegment[] {
    return [
        createLineSegment([ box.min[0], box.min[1] ], [ box.max[0], box.min[1] ]),
        createLineSegment([ box.max[0], box.min[1] ], [ box.max[0], box.max[1] ]),
        createLineSegment([ box.max[0], box.max[1] ], [ box.min[0], box.max[1] ]),
        createLineSegment([ box.min[0], box.max[1] ], [ box.min[0], box.min[1] ]),
    ];
}