import { describe, it, expect } from 'vitest';
import { TILE_SIZE, SCREEN_TILES_X, SCREEN_TILES_Y, CAMERA_ZOOM } from '@/maps/constants/TileConfig';

describe('TileConfig', () => {
  it('tile size matches asset pack (16px)', () => {
    expect(TILE_SIZE).toBe(16);
  });

  it('screen grid is 16x15 tiles (NES layout)', () => {
    expect(SCREEN_TILES_X).toBe(16);
    expect(SCREEN_TILES_Y).toBe(15);
  });

  it('screen dimensions match tile grid', () => {
    expect(TILE_SIZE * SCREEN_TILES_X).toBe(256);
    expect(TILE_SIZE * SCREEN_TILES_Y).toBe(240);
  });

  it('camera zoom is 3x', () => {
    expect(CAMERA_ZOOM).toBe(3);
  });
});
