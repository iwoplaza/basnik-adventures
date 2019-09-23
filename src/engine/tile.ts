import { WorldCollider } from './physics/worldCollider';
import { TileData } from './tileData';
import { TileLocation } from './tileLocation';
import { RenderContext } from './renderContext';
import { World } from './world';

export interface Tile {

    draw(ctx: RenderContext, data: TileData, location: TileLocation): void

    populateCollider(world: World, collider: WorldCollider, data: TileData, location: TileLocation): void

    getOcclusionMask(data: TileData, location: TileLocation): number

}