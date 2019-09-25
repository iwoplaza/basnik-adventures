import { createEngine } from './engine/engine';
import { GameScreen } from './game/screens/gameScreen';
import { GROUND_TILE, GROUND_SLOPE_LEFT_TILE, GROUND_SLOPE_RIGHT_TILE } from './game/gameTiles';
import { loadAll } from './engine/resources/resourceLoader';
import { HAMSTER, SEED, MUSHROOM, TILESHEET } from './game/textures';
import { Seed } from './game/entities/seed';
import { Mushroom } from './game/entities/mushroom';

const engine = createEngine(document.getElementById('canvas') as HTMLCanvasElement, 32, 32);

const map = [
    '                                           ooooooooo                  ',
    '                                          ooooooooooo                 ',
    '                                         ooooooooooooo                ',
    '                                        oooooooooooooo                ',
    '                                      ooooooooooooooo         looooooo',
    '                                      oooooooooooooo       loooooooooo',
    '                                      oooooooooooooo     loooooooooooo',
    '                                      oooooooooooooo     ooooooooooooo',
    '                                      ooooooooooooo      ooooooooooooo',
    '                                   oooooooooooooooo     Tooooooooooooo',
    '                                 oooooooooooooooooo     oooooooooooooo',
    '                                ooooooooooooooooooo      ooooooooooooo',
    '                                    oooooooooooooooT     ooooooooooooo',
    '                                      oooooooooooooor    ooooooooooooo',
    '                             loooor!    oooooooooooooo   ooooooooooooo',
    '                        loooooooooor!    ooooooooo       ooooooooooooo',
    '            !!!        loooooooooooor!                   ooooooooooooo',
    '                     looooooooooooooor!              !!!Tooooooooooooo',
    '   S        lor     looooooooooooooooor!!!!        ooooooooooooooooooo',
    'ooooor!    loooooooooooooooooooooooooooooor!       ooooooooooooooooooo',
    'oooooor!!!looooooooooooooooooooooooooooooooor !!! Tooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
];

const gameScreen = new GameScreen();
gameScreen.world.setWorldSize(map[0].length, map.length);

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
        if (char === 'S')
            gameScreen.player.moveTo([ x + 0.5, y + 0.5 ]);
        if (char === '!')
            gameScreen.world.spawn(new Seed([ x + 0.5, y + 0.5 ]));
        if (char === 'T')
            gameScreen.world.spawn(new Mushroom([ x, y ]));
        
        if (tile !== null) {
            gameScreen.world.tileMap.setTile([ x, y ], { id: tile });
        }
        x++;
    }
    y++;
}
gameScreen.world.compileCollider();

(async () => {
    await loadAll([ HAMSTER, SEED, MUSHROOM, TILESHEET ]);

    engine.showScreen(gameScreen);
    engine.run();
})();