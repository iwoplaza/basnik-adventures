import { TileData } from './tileData';
import { TileLocation } from './tileLocation';

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
        return this.data[location[1] * this.width + location[0]] || null;
    }

}