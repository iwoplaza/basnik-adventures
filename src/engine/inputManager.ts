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