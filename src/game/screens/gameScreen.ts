import { Screen } from '../../engine/screen';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { GameWorld } from '../gameWorld';
import { Player } from '../entities/player';

export class GameScreen implements Screen {

    private world: GameWorld;

    constructor() {
        this.world = new GameWorld(10, 10);
        this.world.spawn(new Player());
    }

    update(ctx: UpdateContext): void {
        this.world.update(ctx);
    }

    draw(ctx: RenderContext) {
        ctx.fillStyle = '#9df';
        ctx.fillRect(0, 0, ctx.width, ctx.height);

        ctx.save();

        ctx.scale(ctx.tileWidth, ctx.tileHeight);
        this.world.draw(ctx);

        ctx.restore();
    }

}