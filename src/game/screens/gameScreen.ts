import { Screen } from '../../engine/screen';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { GameWorld } from '../gameWorld';
import { Player } from '../entities/player';
import { pixelizeVector } from '../../engine/utils';
import { Seed } from '../entities/seed';

export class GameScreen implements Screen {

    public readonly world: GameWorld
    public readonly player: Player

    constructor() {
        this.world = new GameWorld(10, 10);
        this.player = new Player();
        this.world.spawn(this.player);
    }

    update(ctx: UpdateContext): void {
        this.world.update(ctx);
    }

    draw(ctx: RenderContext) {
        ctx.fillStyle = '#9df';
        ctx.fillRect(0, 0, ctx.width, ctx.height);

        const PIXELS_PER_UNIT = ctx.tileWidth * ctx.gameScale;

        let [ cameraX, cameraY ] = pixelizeVector(ctx, this.player.getInterPosition(ctx.partialTick));

        cameraX = Math.max(ctx.width / 2 / PIXELS_PER_UNIT, cameraX);
        cameraY = Math.max(ctx.width / 2 / PIXELS_PER_UNIT, cameraY);

        ctx.save();

        ctx.translate(ctx.width / 2, ctx.height / 2);
        ctx.scale(ctx.gameScale, ctx.gameScale);

        ctx.scale(ctx.tileWidth, ctx.tileHeight);
        ctx.translate(-cameraX, -cameraY);

        this.world.draw(ctx);

        ctx.restore();
    }

}