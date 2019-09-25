import { initSounds } from '../game/gameSounds';

const states: {[key: number]: boolean} = {};

document.addEventListener('keydown', (e: KeyboardEvent) => {
    states[e.keyCode] = true;
    console.log(e.keyCode);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
    states[e.keyCode] = false;
});

export function getKey(keyCode: number): boolean {
    return states[keyCode];
}

function createButton(id: string, keyCode: number): void {
    const element = document.getElementById(id);
    element.addEventListener('touchstart', () => {
        states[keyCode] = true;
        initSounds();
    });
    element.addEventListener('touchend', () => states[keyCode] = false);
}

createButton('left-button', 65);
createButton('right-button', 68);
createButton('jump-button', 32);
createButton('ball-button', 16);