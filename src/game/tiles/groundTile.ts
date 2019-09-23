import { Tile } from '../../engine/tile';
import { RenderContext } from '../../engine/renderContext';
import { TileData } from '../../engine/tileData';
import { TileLocation } from '../../engine/tileLocation';
import { WorldCollider } from '../../engine/physics/worldCollider';
import { TOP, RIGHT, BOTTOM, LEFT } from '../../engine/occlusion';
import { createLineSegment } from '../../engine/physics/lineSegment';
import { GameWorld } from '../gameWorld';

export class GroundTile implements Tile {

    draw(ctx: RenderContext, data: TileData, location: TileLocation): void {
        ctx.fillStyle = 'green';
        ctx.fillRect(location[0], location[1], 1, 1);
    }

    populateCollider(world: GameWorld, collider: WorldCollider, data: TileData, location: TileLocation): void {
        collider.lineSegments.push(...[
            createLineSegment([ location[0], location[1] ], [ location[0] + 1, location[1] ]),
            createLineSegment([ location[0] + 1, location[1] ], [ location[0] + 1, location[1] + 1 ]),
            createLineSegment([ location[0] + 1, location[1] + 1 ], [ location[0], location[1] + 1 ]),
            createLineSegment([ location[0], location[1] + 1 ], [ location[0], location[1] ]),
        ]);
    }

    getOcclusionMask(): number {
        return TOP & RIGHT & BOTTOM & LEFT;
    }

}