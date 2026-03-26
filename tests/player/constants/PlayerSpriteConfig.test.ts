import { describe, it, expect } from 'vitest';
import {
  WALK_FRAME_WIDTH,
  WALK_FRAME_HEIGHT,
  WALK_FRAME_COUNT,
  WALK_FRAME_DURATION_MS,
  ATTACK_FRAME_WIDTH,
  ATTACK_FRAME_HEIGHT,
  ATTACK_FRAME_COUNT,
  ATTACK_FRAME_DURATION_MS,
  WALK_DOWN_Y,
  WALK_RIGHT_Y,
  WALK_UP_Y,
  WALK_LEFT_Y,
  ATTACK_DOWN_Y,
  ATTACK_UP_Y,
  ATTACK_RIGHT_Y,
  ATTACK_LEFT_Y,
  WALK_SHEET_COLUMNS,
  WALK_SHEET_ROWS,
} from '@/player/constants/PlayerSpriteConfig';

describe('PlayerSpriteConfig', () => {
  it('walk frame is 16×32 pixels with 4 frames', () => {
    expect(WALK_FRAME_WIDTH).toBe(16);
    expect(WALK_FRAME_HEIGHT).toBe(32);
    expect(WALK_FRAME_COUNT).toBe(4);
  });

  it('walk frame duration is 150ms', () => {
    expect(WALK_FRAME_DURATION_MS).toBe(150);
  });

  it('attack frame is 32×32 pixels with 4 frames', () => {
    expect(ATTACK_FRAME_WIDTH).toBe(32);
    expect(ATTACK_FRAME_HEIGHT).toBe(32);
    expect(ATTACK_FRAME_COUNT).toBe(4);
  });

  it('attack frame duration is 100ms', () => {
    expect(ATTACK_FRAME_DURATION_MS).toBe(100);
  });

  it('walk direction Y offsets are sequential rows of WALK_FRAME_HEIGHT', () => {
    expect(WALK_DOWN_Y).toBe(0);
    expect(WALK_RIGHT_Y).toBe(32);
    expect(WALK_UP_Y).toBe(64);
    expect(WALK_LEFT_Y).toBe(96);
  });

  it('attack direction Y offsets start at row 9 of the 16×16 grid', () => {
    expect(ATTACK_DOWN_Y).toBe(128);
    expect(ATTACK_UP_Y).toBe(160);
    expect(ATTACK_RIGHT_Y).toBe(192);
    expect(ATTACK_LEFT_Y).toBe(224);
  });

  it('sheet grid dimensions match the 272×256 character.png', () => {
    // 272 / WALK_FRAME_WIDTH = 17 columns, 256 / WALK_FRAME_HEIGHT = 8 rows
    expect(WALK_SHEET_COLUMNS).toBe(17);
    expect(WALK_SHEET_ROWS).toBe(8);
  });
});
