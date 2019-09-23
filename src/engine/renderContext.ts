export interface RenderContext extends CanvasRenderingContext2D {
    width: number
    height: number
    tileWidth: number
    tileHeight: number
    partialTick: number
    deltaTime: number
}