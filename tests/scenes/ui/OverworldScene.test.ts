import { describe, it, expect, vi } from 'vitest';

vi.mock('excalibur', () => ({
  Scene: class MockScene {
    camera = { zoom: 0 };
  },
}));

vi.mock('@/maps/constants/TileConfig', () => ({
  CAMERA_ZOOM: 3,
}));

describe('OverworldScene', () => {
  it('sets camera zoom to CAMERA_ZOOM on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene();
    scene.onInitialize();
    expect(scene.camera.zoom).toBe(3);
  });
});
