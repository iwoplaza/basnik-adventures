import { RenderContext } from './renderContext';
import { UpdateContext } from './updateContext';
import { Vector2, lerp } from './vector';
import { World } from './world/world';

export abstract class Entity<T extends World> {
    
    protected world: T

    protected prevPosition: Vector2
    protected nextPosition: Vector2
    
    constructor() {}

    onSpawned(world: T): void {
        this.world = world;
    }

    abstract update(ctx: UpdateContext): void;
    
    abstract draw(ctx: RenderContext): void;

    public getPrevPosition() { return this.prevPosition }
    
    public getNextPosition() { return this.nextPosition }

    public getInterPosition(tween: number) { return lerp(this.prevPosition, this.nextPosition, tween) }

}