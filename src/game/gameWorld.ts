import { Vector2 } from '../engine/vector';
import { WorldCollider } from '../engine/physics/worldCollider';
import { Entity } from '../engine/entity';
import { UpdateContext } from '../engine/updateContext';
import { RenderContext } from '../engine/renderContext';
import { TileMap } from '../engine/world/tileMap';
import { getTile } from '../engine/world/tileRegistry';
import { World } from '../engine/world/world';
import { TileLocation } from '../engine/world/tileLocation';
import { createLineSegment, LineSegment } from '../engine/physics/lineSegment';

type Chunk = {
    lineSegments: LineSegment[],
};

export class GameWorld implements World {

    public entities: Entity<GameWorld>[]
    public tileMap: TileMap
    private collider: WorldCollider
    private chunks: Chunk[]
    private chunkSize: number = 5;

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
        for (let i = this.entities.length - 1; i >= 0; --i) {
            const entity = this.entities[i];
            entity.update(ctx);

            if (entity.isDead) {
                this.entities.splice(i, 1);
            }
        }
    }

    draw(ctx: RenderContext): void {
        const startX = Math.floor(ctx.viewX - ctx.width / 2 / ctx.tileWidth / ctx.gameScale);
        const startY = Math.floor(ctx.viewY - ctx.height / 2 / ctx.tileHeight / ctx.gameScale);
        
        const endX = Math.floor(ctx.viewX + ctx.width / 2 / ctx.tileWidth / ctx.gameScale);
        const endY = Math.floor(ctx.viewY + ctx.height / 2 / ctx.tileHeight / ctx.gameScale);

        for (let x = startX; x <= endX; ++x) {
            for (let y = startY; y <= endY; ++y) {
                const location: TileLocation = [ x, y ];
                const tileData = this.tileMap.getTile(location);
                if (tileData) {
                    const tile = getTile(tileData);
                    if (tile) {
                        tile.draw(ctx, this, tileData, location);
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
        // World boundaries
        this.collider = { lineSegments: [
            createLineSegment([ 0, 0 ], [ 0, this.height ]),
            createLineSegment([ 0, this.height ], [ this.width, this.height ]),
            createLineSegment([ this.width, this.height ], [ this.width, 0 ]),
            // No ceiling
            // createLineSegment([ this.width, 0 ], [ 0, 0 ]),
        ] };

        this.chunks = [];
        // Tile colliders
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                const chunkX = Math.floor(x / this.chunkSize);
                const chunkY = Math.floor(y / this.chunkSize);
                const chunkIndex = chunkX + chunkY * Math.floor((this.width - 1) / this.chunkSize + 1);
                if (!this.chunks[chunkIndex]) {
                    this.chunks[chunkIndex] = { lineSegments: [] };
                }
                const chunk = this.chunks[chunkIndex];
                const location: TileLocation = [ x, y ];
                const tileData = this.tileMap.getTile(location);
                if (tileData) {
                    const tile = getTile(tileData);
                    if (tile) {
                        tile.populateCollider(this, chunk, tileData, location);
                    }
                }
            }
        }
    }

    private getSegmentsOfChunkAtPos(position: Vector2): LineSegment[] {
        const chunkX = Math.floor(position[0] / this.chunkSize);
        const chunkY = Math.floor(position[1] / this.chunkSize);
        const chunkIndex = chunkX + chunkY * Math.floor((this.width - 1) / this.chunkSize + 1);
        const chunk = this.chunks[chunkIndex];
        return chunk ? chunk.lineSegments : [];
    }

    getCollider(position: Vector2): WorldCollider {
        
        return {
            lineSegments: [
                ...this.collider.lineSegments,
                ...(this.getSegmentsOfChunkAtPos([ position[0], position[1] ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] + this.chunkSize, position[1] ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] + this.chunkSize, position[1] + this.chunkSize ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0], position[1] + this.chunkSize ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] - this.chunkSize, position[1] + this.chunkSize ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] - this.chunkSize, position[1] ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] - this.chunkSize, position[1] + this.chunkSize ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0], position[1] + this.chunkSize ])),
                ...(this.getSegmentsOfChunkAtPos([ position[0] + this.chunkSize, position[1] + this.chunkSize ])),
            ]
        };
    }

}