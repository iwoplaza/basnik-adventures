import { TileMap } from './tileMap';
import { Vector2 } from '../vector';
import { WorldCollider } from '../physics/worldCollider';
import { Entity } from '../entity';

export interface World {

    readonly tileMap: TileMap

    getCollider(position: Vector2): WorldCollider

    spawn(entity: Entity<World>): void

}