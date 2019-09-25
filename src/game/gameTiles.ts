import { GroundTile } from './tiles/groundTile';
import { registerTile } from '../engine/world/tileRegistry';
import { GroundSlopeTile, SlopeDirection } from './tiles/groundSlopeTile';
import { Sprite } from '../engine/graphics/sprite';
import { TILESHEET } from './textures';

export const TILESHEET_SPRITE = new Sprite(TILESHEET, [ 32, 32 ]);

export const GROUND_TILE = registerTile(new GroundTile());
export const GROUND_SLOPE_LEFT_TILE = registerTile(new GroundSlopeTile(SlopeDirection.LEFT));
export const GROUND_SLOPE_RIGHT_TILE = registerTile(new GroundSlopeTile(SlopeDirection.RIGHT));