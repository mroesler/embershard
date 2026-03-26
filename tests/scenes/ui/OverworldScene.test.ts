import { describe, it, expect, vi } from 'vitest';

const mockAddToScene = vi.fn();

vi.mock('excalibur', () => ({
  Scene: class MockScene {
    camera = { zoom: 0 };
  },
}));

vi.mock('@excaliburjs/plugin-tiled', () => ({
  TiledResource: vi.fn(),
}));

vi.mock('@/maps/constants/TileConfig', () => ({
  CAMERA_ZOOM: 3,
}));

describe('OverworldScene', () => {
  it('sets camera zoom to CAMERA_ZOOM on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(scene.camera.zoom).toBe(3);
  });

  it('adds the tiled map to the scene on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(mockAddToScene).toHaveBeenCalledWith(scene);
  });
});
