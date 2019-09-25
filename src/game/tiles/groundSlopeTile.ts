import { RenderContext } from '../../engine/renderContext';
import { WorldCollider } from '../../engine/physics/worldCollider';
import { TOP, RIGHT, BOTTOM, LEFT, OCCLUDE_ALL } from '../../engine/occlusion';
import { createLineSegment } from '../../engine/physics/lineSegment';
import { GameWorld } from '../gameWorld';
import { TileData } from '../../engine/world/tileData';
import { TileLocation } from '../../engine/world/tileLocation';
import { Tile } from '../../engine/world/tile';
import { TILESHEET_SPRITE } from '../gameTiles';

export enum SlopeDirection {
    LEFT, RIGHT
}

export class GroundSlopeTile implements Tile {

    constructor(public readonly direction: SlopeDirection) {

    }

    draw(ctx: RenderContext, world: GameWorld, data: TileData, location: TileLocation): void {
        // ctx.fillStyle = '#4a3';
        // if (this.direction === SlopeDirection.LEFT) {
        //     ctx.beginPath();
        //     ctx.moveTo(location[0] + 1, location[1]);
        //     ctx.lineTo(location[0] + 1, location[1] + 1);
        //     ctx.lineTo(location[0], location[1] + 1);
        //     ctx.fill();
        // } else if (this.direction === SlopeDirection.RIGHT) {
        //     ctx.beginPath();
        //     ctx.moveTo(location[0], location[1]);
        //     ctx.lineTo(location[0] + 1, location[1] + 1);
        //     ctx.lineTo(location[0], location[1] + 1);
        //     ctx.fill();
        // }

        TILESHEET_SPRITE.drawFrame(ctx, [ this.direction === SlopeDirection.RIGHT ? 1 : 2, 0 ], location);
    }

    populateCollider(world: GameWorld, collider: WorldCollider, data: TileData, location: TileLocation): void {
        const [ x, y ] = location;
        const bottom = world.tileMap.getOcclusionMask([ x, y + 1 ]);

        if (!(bottom & TOP)) collider.lineSegments.push(createLineSegment([ x + 1, y + 1 ], [ x, y + 1 ]));
        if (this.direction === SlopeDirection.LEFT) {
            collider.lineSegments.push(createLineSegment([ x, y + 1 ], [ x + 1, y ]));
        } else {
            collider.lineSegments.push(createLineSegment([ x, y ], [ x + 1, y + 1 ]));
        }
    }

    getOcclusionMask(): number {
        return OCCLUDE_ALL;
    }

}