export class Timer {

    private _fixedDeltaTime: number

    private lastTime: number
    private _accumulator: number

    constructor(private updatesPerSecond: number) {
        this._fixedDeltaTime = 1 / updatesPerSecond;
        this.lastTime = Date.now();
        this._accumulator = 0;
    }

    public tick(): number {
        const now = Date.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this._accumulator += deltaTime;

        return deltaTime;
    }

    public deccumulate(): boolean {
        if (this._accumulator >= this.fixedDeltaTime) {
            this._accumulator -= this.fixedDeltaTime;
            return true;
        }

        return false;
    }

    public get accumulator(): number {
        return this._accumulator;
    }

    public get fixedDeltaTime(): number {
        return this._fixedDeltaTime;
    }

    public get partialTick(): number {
        return this._accumulator / this._fixedDeltaTime;
    }

}