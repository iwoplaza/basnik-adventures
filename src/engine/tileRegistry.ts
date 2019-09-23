import { TileData } from './tileData';
import { Tile } from './tile';

let nextFreeId = 0;
const registry: {[key: number]: Tile} = {};

export function getTile(data: TileData): Tile {
    return registry[data.id];
}

export function registerTile(tile: Tile): number {
    const id = nextFreeId++;
    registry[id] = tile;
    return id;
}