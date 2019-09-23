import { Vector2 } from './vector';
import { RenderContext } from './renderContext';

export function pixelizeVector(ctx: RenderContext, vector: Vector2): Vector2 {
    const PIXELS_PER_UNIT = ctx.tileWidth * ctx.gameScale;

    return vector.map(x => Math.floor(x * PIXELS_PER_UNIT) / PIXELS_PER_UNIT) as Vector2;
}