import { createEngine } from './engine/engine';
import { GameScreen } from './game/screens/gameScreen';

const engine = createEngine(document.getElementById('canvas') as HTMLCanvasElement, 16, 16);

engine.showScreen(new GameScreen());
engine.run();