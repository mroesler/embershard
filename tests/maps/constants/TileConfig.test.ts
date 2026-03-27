import { describe, it, expect } from 'vitest';
import {
  TILE_SIZE,
  SCREEN_TILES_X,
  SCREEN_TILES_Y,
  CAMERA_ZOOM,
  HUD_TOP_HEIGHT,
  HUD_BOTTOM_HEIGHT,
  GAME_AREA_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CAMERA_INITIAL_X,
  CAMERA_INITIAL_Y,
} from '@/maps/constants/TileConfig';

describe('TileConfig', () => {
  it('tile size matches asset pack (16px)', () => {
    expect(TILE_SIZE).toBe(16);
  });

  it('screen grid is 32x16 tiles (widescreen layout)', () => {
    expect(SCREEN_TILES_X).toBe(32);
    expect(SCREEN_TILES_Y).toBe(16);
  });

  it('game area logical dimensions match tile grid', () => {
    expect(TILE_SIZE * SCREEN_TILES_X).toBe(512);
    expect(TILE_SIZE * SCREEN_TILES_Y).toBe(256);
  });

  it('camera zoom is 3 (engine renders at 3× to ensure crisp canvas text)', () => {
    expect(CAMERA_ZOOM).toBe(3);
  });

  it('HUD top strip is 2 tiles tall in screen pixels', () => {
    expect(HUD_TOP_HEIGHT).toBe(TILE_SIZE * 2 * CAMERA_ZOOM);
  });

  it('HUD bottom strip is 4 tiles tall in screen pixels', () => {
    expect(HUD_BOTTOM_HEIGHT).toBe(TILE_SIZE * 4 * CAMERA_ZOOM);
  });

  it('game area height matches tile grid height scaled by camera zoom', () => {
    expect(GAME_AREA_HEIGHT).toBe(TILE_SIZE * SCREEN_TILES_Y * CAMERA_ZOOM);
  });

  it('canvas width equals game area width scaled by camera zoom', () => {
    expect(CANVAS_WIDTH).toBe(TILE_SIZE * SCREEN_TILES_X * CAMERA_ZOOM);
  });

  it('canvas height equals HUD strips plus game area', () => {
    expect(CANVAS_HEIGHT).toBe(HUD_TOP_HEIGHT + GAME_AREA_HEIGHT + HUD_BOTTOM_HEIGHT);
  });

  it('camera initial X is at horizontal map centre in world pixels', () => {
    expect(CAMERA_INITIAL_X).toBe(SCREEN_TILES_X * TILE_SIZE / 2);
  });

  it('camera initial Y maps world y=0 to screen y=HUD_TOP_HEIGHT', () => {
    // screen_y = CANVAS_HEIGHT/2 + (world_y - camera_y) × zoom
    // For world_y=0: CANVAS_HEIGHT/2 − CAMERA_INITIAL_Y × CAMERA_ZOOM = HUD_TOP_HEIGHT
    expect(CANVAS_HEIGHT / 2 - CAMERA_INITIAL_Y * CAMERA_ZOOM).toBe(HUD_TOP_HEIGHT);
  });
});
