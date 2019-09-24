import { createEngine } from './engine/engine';
import { GameScreen } from './game/screens/gameScreen';
import { GROUND_TILE, GROUND_SLOPE_LEFT_TILE, GROUND_SLOPE_RIGHT_TILE } from './game/gameTiles';
import { loadAll } from './engine/resources/resourceLoader';
import { HAMSTER } from './game/textures';
import { Seed } from './game/entities/seed';

const engine = createEngine(document.getElementById('canvas') as HTMLCanvasElement, 32, 32);

const map = [
    '                              ',
    '                              ',
    '                              ',
    '                        looooo',
    '            !!!        loooooo',
    '                     loooooooo',
    '    S       lor     looooooooo',
    'ooooor!    loooooooooooooooooo',
    'oooooor!!!looooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooo',
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
        if (char === '!')
            gameScreen.world.spawn(new Seed([ x + 0.5, y + 0.5 ]));
        if (char === 'S')
            gameScreen.player.moveTo([ x + 0.5, y + 0.5 ]);
        
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