import { RenderContext } from './renderContext';
import { UpdateContext } from './updateContext';

export interface Screen {

    update(ctx: UpdateContext): void;
    
    draw(ctx: RenderContext): void;

}