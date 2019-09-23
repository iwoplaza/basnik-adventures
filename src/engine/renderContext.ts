export interface RenderContext extends CanvasRenderingContext2D {
    width: number
    height: number
    tileWidth: number
    tileHeight: number
    gameScale: number
    partialTick: number
    deltaTime: number
}