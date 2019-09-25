import { Screen } from './screen';
import { RenderContext } from './renderContext';
import { Timer } from './timer';
import { UpdateContext } from './updateContext';

export class Engine {

    private static readonly TARGET_UPS = 30

    private currentScreen: Screen|null

    private readonly timer: Timer

    constructor(
        private ctx: RenderContext,
        ) {

        this.currentScreen = null;

        this.timer = new Timer(Engine.TARGET_UPS, 10);
    }

    public showScreen(screen: Screen): void {
        this.currentScreen = screen;
    }

    public run() {
        this.animationLoop();
    }

    private animationLoop() {
        const deltaTime = this.timer.tick();

        while (this.timer.deccumulate())
        {
            this.update(this.timer);
        }

        this.ctx.deltaTime = deltaTime;
        this.ctx.partialTick = this.timer.partialTick;
        this.draw();

        requestAnimationFrame(() => this.animationLoop());
    }

    private draw(): void {
        if (this.currentScreen) {
            this.currentScreen.draw(this.ctx);
        }
    }

    private update(ctx: UpdateContext): void {
        if (this.currentScreen) {
            this.currentScreen.update(ctx);
        }
    }

}

export function createEngine(canvas: HTMLCanvasElement, tileWidth: number, tileHeight: number): Engine {
    const ctx = canvas.getContext('2d') as RenderContext;
    ctx.width = canvas.width;
    ctx.height = canvas.height;
    ctx.tileWidth = tileWidth;
    ctx.tileHeight = tileHeight;
    ctx.gameScale = 2;
    ctx.viewX = 0;
    ctx.viewY = 0;

    // Disabling filtering
    ctx.imageSmoothingEnabled = false;

    return new Engine(ctx);
}