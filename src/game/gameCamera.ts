import { Camera } from '../engine/camera';
import { Vector2 } from '../engine/vector';

export class GameCamera implements Camera {

    public position: Vector2
    public scale: number

    constructor() {
        this.position = [ 0, 0 ];
        this.scale = 3;
    }

}