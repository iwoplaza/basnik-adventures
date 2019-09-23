import { TileData } from './tileData';
import { TileLocation } from './tileLocation';
import { getTile } from './tileRegistry';
import { OCCLUDE_ALL } from '../occlusion';

export class TileMap {

    private data: { [key: number]: TileData }

    constructor(
        public readonly width: number,
        public readonly height: number,
        ) {

        this.data = [];
    }

    public setTile(location: TileLocation, data: TileData): void {
        this.data[location[1] * this.width + location[0]] = data;
    }

    public getTile(location: TileLocation): TileData | null {
        if (location[0] < 0 || location[0] >= this.width)
            return null;
        if (location[1] < 0 || location[1] >= this.height)
            return null;
        return this.data[location[1] * this.width + location[0]] || null;
    }

    public getOcclusionMask(location: TileLocation): number {
        const data = this.getTile(location);
        if (data) {
            const tile = getTile(data);
            return tile ? tile.getOcclusionMask(data, location) : 0;
        }

        return 0;
    }

}