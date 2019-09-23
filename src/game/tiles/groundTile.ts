import { RenderContext } from '../../engine/renderContext';
import { WorldCollider } from '../../engine/physics/worldCollider';
import { TOP, RIGHT, BOTTOM, LEFT, OCCLUDE_ALL } from '../../engine/occlusion';
import { createLineSegment } from '../../engine/physics/lineSegment';
import { GameWorld } from '../gameWorld';
import { TileData } from '../../engine/world/tileData';
import { TileLocation } from '../../engine/world/tileLocation';
import { Tile } from '../../engine/world/tile';

export class GroundTile implements Tile {

    draw(ctx: RenderContext, data: TileData, location: TileLocation): void {
        ctx.fillStyle = '#4a3';
        ctx.fillRect(location[0], location[1], 1, 1);
    }

    populateCollider(world: GameWorld, collider: WorldCollider, data: TileData, location: TileLocation): void {
        const [ x, y ] = location;
        const top = world.tileMap.getOcclusionMask([ x, y - 1 ]);
        const right = world.tileMap.getOcclusionMask([ x + 1, y ]);
        const bottom = world.tileMap.getOcclusionMask([ x, y + 1 ]);
        const left = world.tileMap.getOcclusionMask([ x - 1, y ]);

        if (!(top & BOTTOM)) collider.lineSegments.push(createLineSegment([ x, y ], [ x + 1, y ]));
        if (!(right & LEFT)) collider.lineSegments.push(createLineSegment([ x + 1, y ], [ x + 1, y + 1 ]));
        if (!(bottom & TOP)) collider.lineSegments.push(createLineSegment([ x + 1, y + 1 ], [ x, y + 1 ]));
        if (!(left & RIGHT)) collider.lineSegments.push(createLineSegment([ x, y + 1 ], [ x, y ]));
    }

    getOcclusionMask(): number {
        return OCCLUDE_ALL;
    }

}