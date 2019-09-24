import { Camera } from '../engine/camera';
import { Vector2 } from '../engine/vector';

export class GameCamera implements Camera {

    public position: Vector2

    constructor() {
        this.position = [ 0, 0 ];
    }

}