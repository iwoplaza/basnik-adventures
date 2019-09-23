import { Screen } from '../../engine/screen';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { GameWorld } from '../gameWorld';
import { Player } from '../entities/player';
import { pixelizeVector } from '../../engine/utils';
import { GameCamera } from '../gameCamera';

export class GameScreen implements Screen {

    public readonly world: GameWorld
    private player: Player
    private camera: GameCamera

    constructor() {
        this.world = new GameWorld(10, 10);
        this.player = new Player();
        this.world.spawn(this.player);
        this.camera = new GameCamera();
    }

    update(ctx: UpdateContext): void {
        this.world.update(ctx);
    }

    draw(ctx: RenderContext) {
        ctx.fillStyle = '#9df';
        ctx.fillRect(0, 0, ctx.width, ctx.height);

        const [ playerX, playerY ] = pixelizeVector(ctx, this.player.getInterPosition(ctx.partialTick));

        ctx.save();

        ctx.translate(ctx.width / 2, ctx.height / 2);
        ctx.scale(ctx.gameScale, ctx.gameScale);

        ctx.scale(ctx.tileWidth, ctx.tileHeight);
        ctx.translate(-playerX, -playerY);

        this.world.draw(ctx);

        ctx.restore();
    }

}