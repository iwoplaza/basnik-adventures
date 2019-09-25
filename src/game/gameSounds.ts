import { Sound } from '../engine/sound';

export const BOUNCE = new Sound(`public/sounds/bounce.wav`);
export const COLLECT = new Sound(`public/sounds/collect.wav`);

let initialized = false;
export function initSounds() {
    if (initialized)
        return;

    initialized = true;
    COLLECT.initForMobilePlay();
    BOUNCE.initForMobilePlay();
}