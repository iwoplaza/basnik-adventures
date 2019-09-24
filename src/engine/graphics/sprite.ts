import { Texture } from '../resources/texture';
import { Vector2 } from '../vector';
import { RenderContext } from '../renderContext';

export class Sprite {

    constructor(
        private texture: Texture,
        private frameSize: Vector2
    ) {

    }

    drawFrame(ctx: RenderContext, frame: Vector2, position: Vector2): void {
        let [ frameX, frameY ] = frame.map(x => x * ctx.tileWidth);
        let [ distSizeX, distSizeY ] = this.frameSize;
        distSizeX /= ctx.tileWidth;
        distSizeY /= ctx.tileHeight;
        ctx.drawImage(this.texture.image, frameX, frameY, this.frameSize[0], this.frameSize[1], position[0], position[1], distSizeX, distSizeY);
    }

}