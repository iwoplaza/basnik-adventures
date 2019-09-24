import { Entity } from '../../engine/entity';
import { GameWorld } from '../gameWorld';
import { RenderContext } from '../../engine/renderContext';
import { UpdateContext } from '../../engine/updateContext';
import { pixelizeVector } from '../../engine/utils';
import { lerp, Vector2 } from '../../engine/vector';
import { Sprite } from '../../engine/graphics/sprite';
import { MUSHROOM } from '../textures';
import { BoxCollider } from '../../engine/physics/boxCollider';

const sprite = new Sprite(MUSHROOM, [ 32, 32 ]);

export class Mushroom extends Entity<GameWorld> {

    private bounceCycle: number

    constructor(position: Vector2) {
        super();
        this.prevPosition = [ ...position ] as Vector2;
        this.nextPosition = [ ...position ] as Vector2;

        this.bounceCycle = 0;
    }

    draw(ctx: RenderContext): void {
        // Updating animations
        let bounceFrames = [ 1, 2, 0, 3 ];
        let frame = 0;

        if (this.bounceCycle > 0) {
            let index = Math.floor((1 - this.bounceCycle) * bounceFrames.length);
            index = Math.min(index, bounceFrames.length - 1);

            frame = bounceFrames[index];
            this.bounceCycle = Math.max(0, this.bounceCycle - ctx.deltaTime * 4);
        }

        ctx.save();

        const interPos = pixelizeVector(ctx, lerp(this.prevPosition, this.nextPosition, ctx.partialTick));
        ctx.translate(...interPos);

        
        sprite.drawFrame(ctx, [ frame, 0 ], [ 0, 0 ]);

        ctx.restore();
    }

    update(ctx: UpdateContext): void {

    }

    getCollider(): BoxCollider {
        return {
            min: [ this.nextPosition[0] + 0.2, this.nextPosition[1] + 0.3 ],
            max: [ this.nextPosition[0] + 0.8, this.nextPosition[1] + 1 ],
        };
    }

    public onBounce(): void {
        this.bounceCycle = 1;
    }

}