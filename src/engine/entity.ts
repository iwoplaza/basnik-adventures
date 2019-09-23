import { RenderContext } from './renderContext';
import { UpdateContext } from './updateContext';
import { World } from './world';

export abstract class Entity<T extends World> {
    
    protected x: number;
    protected y: number;
    protected world: T;
    
    constructor() {}

    onSpawned(world: T): void {
        this.world = world;
    }

    abstract update(ctx: UpdateContext): void;
    
    abstract draw(ctx: RenderContext): void;

}