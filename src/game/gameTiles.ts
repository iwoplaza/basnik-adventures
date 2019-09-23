import { GroundTile } from './tiles/groundTile';
import { registerTile } from '../engine/tileRegistry';

export const GROUND_TILE = registerTile(new GroundTile());