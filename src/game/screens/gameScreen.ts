import { Screen } from '../../engine/screen';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { GameWorld } from '../gameWorld';
import { Player } from '../entities/player';
import { pixelizeVector } from '../../engine/utils';

export class GameScreen implements Screen {

    public readonly world: GameWorld
    public readonly player: Player

    private cameraX: number
    private cameraY: number

    constructor() {
        this.world = new GameWorld(10, 10);
        this.player = new Player();
        this.world.spawn(this.player);

        this.cameraX = 0;
        this.cameraY = 0;
    }

    update(ctx: UpdateContext): void {
        this.world.update(ctx);
    }

    draw(ctx: RenderContext) {
        const grd = ctx.createLinearGradient(0, 0, 0, ctx.height);
        grd.addColorStop(0, '#7cf');
        grd.addColorStop(1, "#14a");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, ctx.width, ctx.height);

        const PIXELS_PER_UNIT = ctx.tileWidth * ctx.gameScale;

        let [ targetCameraX, targetCameraY ] = pixelizeVector(ctx, this.player.getInterPosition(ctx.partialTick));

        // Left boundary
        targetCameraX = Math.max(ctx.width / 2 / PIXELS_PER_UNIT, targetCameraX);
        // Right boundary
        targetCameraX = Math.min(this.world.width - ctx.width / 2 / PIXELS_PER_UNIT, targetCameraX);
        // Bottom boundary
        targetCameraY = Math.min(this.world.height - ctx.width / 2 / PIXELS_PER_UNIT, targetCameraY);

        this.cameraX += (targetCameraX - this.cameraX) * 0.6;
        this.cameraY += (targetCameraY - this.cameraY) * 0.6;

        const cameraPosition = pixelizeVector(ctx, [ this.cameraX, this.cameraY ]);

        ctx.save();

        ctx.translate(ctx.width / 2, ctx.height / 2);
        ctx.scale(ctx.gameScale, ctx.gameScale);

        ctx.scale(ctx.tileWidth, ctx.tileHeight);
        ctx.translate(-cameraPosition[0], -cameraPosition[1]);

        this.world.draw(ctx);

        ctx.restore();

        this.drawUI(ctx);
    }

    private drawUI(ctx: RenderContext): void {
        const points = `${this.player.points}`;

        ctx.font = '30px "Press Start 2P"';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.lineCap = 'square';
        ctx.strokeText(points, 10, 50);
        ctx.fillStyle = 'white';
        ctx.fillText(points, 10, 50);
    }

}