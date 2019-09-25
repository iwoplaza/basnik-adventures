import { TileData } from './tileData';
import { TileLocation } from './tileLocation';
import { World } from './world';
import { WorldCollider } from '../physics/worldCollider';
import { RenderContext } from '../renderContext';

export interface Tile {

    draw(ctx: RenderContext, world: World, data: TileData, location: TileLocation): void

    populateCollider(world: World, collider: WorldCollider, data: TileData, location: TileLocation): void

    getOcclusionMask(data: TileData, location: TileLocation): number

}