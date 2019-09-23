import { WorldCollider } from './physics/worldCollider';
import { Vector2 } from './vector';
import { Entity } from './entity';

export interface World {

    getCollider(position: Vector2): WorldCollider

    spawn(entity: Entity<World>): void

}