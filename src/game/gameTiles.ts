import { GroundTile } from './tiles/groundTile';
import { registerTile } from '../engine/world/tileRegistry';
import { GroundSlopeTile, SlopeDirection } from './tiles/groundSlopeTile';

export const GROUND_TILE = registerTile(new GroundTile());
export const GROUND_SLOPE_LEFT_TILE = registerTile(new GroundSlopeTile(SlopeDirection.LEFT));
export const GROUND_SLOPE_RIGHT_TILE = registerTile(new GroundSlopeTile(SlopeDirection.RIGHT));