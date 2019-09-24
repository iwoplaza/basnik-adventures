import { Entity } from '../../engine/entity';
import { GameWorld } from '../gameWorld';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { pixelizeVector } from '../../engine/utils';
import { lerp, Vector2 } from '../../engine/vector';
import { Sprite } from '../../engine/graphics/sprite';
import { SEED } from '../textures';

const sprite = new Sprite(SEED, [ 16, 16 ]);

export class Seed extends Entity<GameWorld> {

    private bobCycle: number
    private shineCycle: number

    constructor(position: Vector2) {
        super();
        this.prevPosition = [ ...position ] as Vector2;
        this.nextPosition = [ ...position ] as Vector2;

        this.bobCycle = Math.random();
        this.shineCycle = 0;
    }

    draw(ctx: RenderContext): void {
        // Updating animations
        this.bobCycle = (this.bobCycle + ctx.deltaTime * 1) % 1;
        this.shineCycle = (this.shineCycle + ctx.deltaTime * 12) % 20;
        

        ctx.save();

        const interPos = pixelizeVector(ctx, lerp(this.prevPosition, this.nextPosition, ctx.partialTick));
        ctx.translate(...interPos);
        ctx.translate(0, Math.sin(this.bobCycle * Math.PI * 2) * 0.05);

        let frame = Math.floor(Math.max(0, this.shineCycle - 17));
        sprite.drawFrame(ctx, [ frame, 0 ], [ -0.25, -0.25 ]);

        ctx.restore();
    }

    update(ctx: UpdateContext): void {

    }

    public onCollected(): void {
        this.dead = true;
    }

}