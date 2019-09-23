import { Vector2 } from '../engine/vector';
import { WorldCollider } from '../engine/physics/worldCollider';
import { Entity } from '../engine/entity';
import { UpdateContext } from '../engine/updateContext';
import { RenderContext } from '../engine/renderContext';
import { TileMap } from '../engine/world/tileMap';
import { getTile } from '../engine/world/tileRegistry';
import { World } from '../engine/world/world';
import { TileLocation } from '../engine/world/tileLocation';

export class GameWorld implements World {

    private entities: Entity<GameWorld>[]
    public tileMap: TileMap
    private collider: WorldCollider

    constructor(public width: number, public height: number) {
        this.entities = [];
        this.tileMap = new TileMap(width, height);
        this.collider = { lineSegments: [] };
    }

    setWorldSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.tileMap = new TileMap(width, height);
        this.collider = { lineSegments: [] };
    }

    update(ctx: UpdateContext): void {
        for (const entity of this.entities) {
            entity.update(ctx);
        }
    }

    draw(ctx: RenderContext): void {
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                const location: TileLocation = [ x, y ];
                const tileData = this.tileMap.getTile(location);
                if (tileData) {
                    const tile = getTile(tileData);
                    if (tile) {
                        tile.draw(ctx, tileData, location);
                    }
                }
            }
        }

        for (const entity of this.entities) {
            entity.draw(ctx);
        }
    }

    spawn(entity: Entity<GameWorld>): void {
        entity.onSpawned(this);
        this.entities.push(entity);
    }

    compileCollider(): void {
        this.collider = { lineSegments: [] };

        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                const location: TileLocation = [ x, y ];
                const tileData = this.tileMap.getTile(location);
                if (tileData) {
                    const tile = getTile(tileData);
                    if (tile) {
                        tile.populateCollider(this, this.collider, tileData, location);
                    }
                }
            }
        }
    }

    getCollider(position: Vector2): WorldCollider {
        return this.collider;
    }

}