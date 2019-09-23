import { createEngine } from './engine/engine';
import { GameScreen } from './game/screens/gameScreen';
import { GROUND_TILE, GROUND_SLOPE_LEFT_TILE, GROUND_SLOPE_RIGHT_TILE } from './game/gameTiles';
import { loadAll } from './engine/resources/resourceLoader';
import { HAMSTER } from './game/textures';

const engine = createEngine(document.getElementById('canvas') as HTMLCanvasElement, 16, 16);

const map = [
    '                          ',
    '                          ',
    '                          ',
    '                    looooo',
    '                   loooooo',
    '                 loooooooo',
    '        lor     looooooooo',
    'or     loooooooooooooooooo',
    'oor   looooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooo',
];

const gameScreen = new GameScreen();
gameScreen.world.setWorldSize(100, 100);

let y = 0;
for (const line of map) {
    let x = 0;
    for (const char of line) {
        let tile = null;
        if (char === 'o')
            tile = GROUND_TILE;
        if (char === 'l')
            tile = GROUND_SLOPE_LEFT_TILE;
        if (char === 'r')
            tile = GROUND_SLOPE_RIGHT_TILE;
        
        if (tile !== null) {
            gameScreen.world.tileMap.setTile([ x, y ], { id: tile });
        }
        x++;
    }
    y++;
}
gameScreen.world.compileCollider();

(async () => {
    await loadAll([ HAMSTER ]);

    engine.showScreen(gameScreen);
    engine.run();
})();