import { describe, it, expect } from 'vitest';
import { TILE_SIZE, SCREEN_TILES_X, SCREEN_TILES_Y, CAMERA_ZOOM } from '@/maps/constants/TileConfig';

describe('TileConfig', () => {
  it('tile size matches asset pack (16px)', () => {
    expect(TILE_SIZE).toBe(16);
  });

  it('screen grid is 32x16 tiles (widescreen layout)', () => {
    expect(SCREEN_TILES_X).toBe(32);
    expect(SCREEN_TILES_Y).toBe(16);
  });

  it('screen dimensions match tile grid', () => {
    expect(TILE_SIZE * SCREEN_TILES_X).toBe(512);
    expect(TILE_SIZE * SCREEN_TILES_Y).toBe(256);
  });

  it('camera zoom is 1 (CSS handles visual scaling)', () => {
    expect(CAMERA_ZOOM).toBe(1);
  });
});
