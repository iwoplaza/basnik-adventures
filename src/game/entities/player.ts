import { Entity } from '../../engine/entity';
import { RenderContext } from '../../engine/renderContext';
import { getKey } from '../../engine/inputManager';
import { LineSegment, projectOntoLineSegmentClamped } from '../../engine/physics/lineSegment';
import { Vector2, sub, normalize, distance, scale, add, length, dot, lerp, distanceSq } from '../../engine/vector';
import { UpdateContext } from '../../engine/updateContext';
import { GameWorld } from '../gameWorld';
import { pixelizeVector } from '../../engine/utils';
import { HAMSTER } from '../textures';
import { Sprite } from '../../engine/graphics/sprite';
import { Seed } from './seed';
import { Mushroom } from './mushroom';
import { lineSegmentsFromBoxCollider } from '../../engine/physics/boxCollider';

const sprite = new Sprite(HAMSTER, [ 32, 32 ]);

export class Player extends Entity<GameWorld> {

    private velocity: Vector2
    private turnSide: boolean
    private onGround: boolean
    private walking: boolean
    private groundNormal: Vector2

    public points: number

    private walkCycle = 0

    private static readonly WALK_SPEED = 0.07
    private static readonly RUN_SPEED = 0.22
    private static readonly ACCELERATION = 0.03125
    private static readonly DECELERATION = 0.03125
    private static readonly GRAVITY: Vector2 = [ 0, 0.03 ]

    constructor() {
        super();
        this.prevPosition = [ 0, 0 ];
        this.nextPosition = [ 0, 0 ];
        this.velocity = [ 0, 0 ];

        this.turnSide = true;
        this.onGround = false;
        this.walking = false;
        this.groundNormal = [ 0, 0 ];

        this.points = 0;

        this.walkCycle = 0;
    }

    public moveTo(position: Vector2): void {
        this.prevPosition = [ ...position ] as Vector2;
        this.nextPosition = [ ...position ] as Vector2;
    }

    public update(ctx: UpdateContext): void {
        this.prevPosition = [ ...this.nextPosition ] as Vector2;

        this.walking = false;

        let moveDirection = 0;

        if (getKey(65)) {
            moveDirection = -1;
            this.walking = true;
        }

        if (getKey(68)) {
            moveDirection = 1;
            this.walking = true;
        }

        if (getKey(32)) {
            this.jump();
        }

        this.velocity = add(this.velocity, Player.GRAVITY);

        const moveVelocity = Player.RUN_SPEED * moveDirection;

        if (moveDirection > 0)
        {
            this.turnSide = true;
            if (this.velocity[0] < moveVelocity)
            {
                this.velocity[0] += Player.ACCELERATION;
                if (this.velocity[0] > moveVelocity)
                    this.velocity[0] = moveVelocity;
            }
            else
            {
                this.velocity[0] -= Player.DECELERATION;
                if (this.velocity[0] < moveVelocity)
                    this.velocity[0] = moveVelocity;
            }
        }
        else if (moveDirection < 0)
        {
            this.turnSide = false;
            if (this.velocity[0] > moveVelocity)
            {
                this.velocity[0] -= Player.ACCELERATION;
                if (this.velocity[0] < moveVelocity)
                    this.velocity[0] = moveVelocity;
            }
            else
            {
                this.velocity[0] += Player.DECELERATION;
                if (this.velocity[0] > moveVelocity)
                    this.velocity[0] = moveVelocity;
            }
        }
        else
        {
            this.decelerate();
        }

        this.nextPosition = add(this.nextPosition, this.velocity);
        
        this.onGround = false;

        for (const segment of this.world.getCollider(this.nextPosition).lineSegments) {
            this.collideWithSegment(segment);
        }

        for (const entity of this.world.entities) {
            if (entity === this || entity.isDead) {
                continue;
            }

            if (entity instanceof Seed) {
                const dist = distanceSq(this.nextPosition, entity.getNextPosition());
                if (dist < 0.2) {
                    entity.onCollected();
                    this.points++;
                }
            }

            if (entity instanceof Mushroom) {
                const segments = lineSegmentsFromBoxCollider(entity.getCollider());
                const collided = segments.map((s) => this.collideWithSegment(s)).some(result => result === true);

                if (collided && this.velocity[1] > 0 && this.nextPosition[1] < entity.getNextPosition()[1] + 0.5) {
                    this.velocity[1] = -0.5;
                    entity.onBounce();
                }
            }
        }
    }

    private collideWithSegment(segment: LineSegment): boolean {
        const n = segment.normal;

        const prevToNextNormal = normalize(sub(this.nextPosition, this.prevPosition));
        const prevToNextDist = distance(this.prevPosition, this.nextPosition);

        const radius = 0.3;
        const interval = 0.1;

        let progress = Math.min(interval, prevToNextDist);
        let interPosition = add(this.prevPosition, scale(prevToNextNormal, progress));

        const endCenter = [ ...this.nextPosition] as Vector2;
        const endCenterProj = projectOntoLineSegmentClamped(endCenter, segment);
        const endCenterToProj = sub(endCenterProj, endCenter);
        const endDist = length(endCenterToProj);
        
        do
        {
            const center = [ ...interPosition ] as Vector2;
            const proj = projectOntoLineSegmentClamped(center, segment);
            const centerToProj = sub(proj, center);
            let centerToProjNormal = normalize(centerToProj);
            const projToCenterDist = length(centerToProj);
            
            // Checking if we're are intersecting
            if (projToCenterDist < radius)
            {
                let p = radius - endDist;
                const direction = dot(n, prevToNextNormal);
                
                if (direction >= 0)
                    return false;
                
                const nextPosNormalDot = dot(centerToProjNormal, endCenterToProj);
                if (nextPosNormalDot < 0)
                {
                    p = endDist + radius;
                }

                const groundSlope = dot(scale(n, -1), normalize(Player.GRAVITY));
                if (groundSlope > 0.4) // The ground is flat enough to be regarded as ground
                {
                    this.onGround = true;
                    this.groundNormal = [ ...n ] as Vector2;
                }

                centerToProjNormal = centerToProjNormal.map(_ => _ * -p) as Vector2;
                this.nextPosition = add(this.nextPosition, centerToProjNormal);
                this.velocity = add(this.velocity, centerToProjNormal);

                // Already collided, no need for more checks
                return true;
            }

            if (progress >= prevToNextDist)
                break;

            progress += interval;
            if (progress >= prevToNextDist)
            {
                progress = prevToNextDist;
                interPosition = [ ...this.nextPosition ] as Vector2;
            }
            else
            {
                interPosition = add(interPosition, scale(prevToNextNormal, interval));
            }
        }
        while (progress <= prevToNextDist);

        return false;
    }

    private decelerate(): void {
        if (this.velocity[0] > 0)
        {
            this.velocity[0] -= Player.DECELERATION;
            if (this.velocity[0] < 0)
                this.velocity[0] = 0;
        }
        else if (this.velocity[0] < 0)
        {
            this.velocity[0] += Player.DECELERATION;
            if (this.velocity[0] > 0)
                this.velocity[0] = 0;
        }
    }

    private jump(): void {
        if (this.onGround) {
            this.velocity[1] = -0.3;
        }
    }

    public draw(ctx: RenderContext): void {
        // for (const segment of this.world.getCollider(this.nextPosition).lineSegments) {
        //     ctx.beginPath();
        //     ctx.lineWidth = 0.1;
        //     ctx.moveTo(...segment.point1);
        //     ctx.lineTo(...segment.point2);
        //     ctx.stroke();
        // }
        
        ctx.save();

        const interPos = pixelizeVector(ctx, lerp(this.prevPosition, this.nextPosition, ctx.partialTick));
        ctx.translate(...interPos);
        ctx.scale(this.turnSide ? 1 : -1, 1);

        let frame: Vector2 = [ 0, 0 ];
        
        if (!this.onGround) {
            frame = [ 0, 2 ];
        } else if (this.walking) {
            this.walkCycle += ctx.deltaTime * 8;
            const cycle = (this.walkCycle % 4 / 4);

            ctx.translate(Math.sin(cycle * Math.PI * 4) * 0.03, 0);

            const walkFrame = tweenWalkCycle(cycle, 0.7);

            frame = [ walkFrame, 1 ];
        }

        sprite.drawFrame(ctx, frame, [ -0.5, -0.5 ]);

        ctx.restore();
    }

}

function tweenWalkCycle(cycle: number, extremeProportion: number): number {
    const inbetweenProportion = 1 - extremeProportion;
    let frame = 3;
    if (cycle < extremeProportion / 2) {
        frame = 0;
    } else if (cycle < 0.5) {
        frame = 1;
    } else if (cycle < 0.5 + extremeProportion / 2) {
        frame = 2;
    }

    return frame;
}