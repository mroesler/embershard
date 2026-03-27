import { describe, it, expect } from 'vitest';
import {
  WALK_SPEED,
  PLAY_AREA_WIDTH,
  PLAY_AREA_HEIGHT,
  SPRITE_COLLISION_WIDTH,
  SPRITE_COLLISION_HEIGHT,
  PLAYER_MIN_X,
  PLAYER_MAX_X,
  PLAYER_MIN_Y,
  PLAYER_MAX_Y,
} from '@/player/constants/PlayerMovement';

describe('PlayerMovement', () => {
  it('walk speed is 100 pixels per second', () => {
    expect(WALK_SPEED).toBe(100);
  });

  it('play area matches game area dimensions', () => {
    expect(PLAY_AREA_WIDTH).toBe(512);
    expect(PLAY_AREA_HEIGHT).toBe(256);
  });

  it('sprite collision box matches walk frame dimensions', () => {
    expect(SPRITE_COLLISION_WIDTH).toBe(16);
    expect(SPRITE_COLLISION_HEIGHT).toBe(32);
  });

  it('player bounds keep the sprite fully within the map', () => {
    expect(PLAYER_MIN_X).toBe(SPRITE_COLLISION_WIDTH / 2);
    expect(PLAYER_MAX_X).toBe(PLAY_AREA_WIDTH - SPRITE_COLLISION_WIDTH / 2);
    expect(PLAYER_MIN_Y).toBe(SPRITE_COLLISION_HEIGHT / 2);
    expect(PLAYER_MAX_Y).toBe(PLAY_AREA_HEIGHT - SPRITE_COLLISION_HEIGHT / 2);
  });
});
