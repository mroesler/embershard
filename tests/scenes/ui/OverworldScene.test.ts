import { describe, it, expect, vi } from 'vitest';

const mockAddToScene = vi.fn();
const mockHudInitialize = vi.fn();
const mockAdd = vi.fn();

vi.mock('excalibur', () => ({
  Scene: class MockScene {
    camera = { zoom: 0 };
    add = mockAdd;
  },
}));

vi.mock('@excaliburjs/plugin-tiled', () => ({
  TiledResource: vi.fn(),
}));

vi.mock('@/maps/constants/TileConfig', () => ({
  CAMERA_ZOOM: 1,
}));

vi.mock('@/player/models/PlayerStats', () => ({
  PlayerStats: vi.fn(function (this: unknown) {}),
}));

vi.mock('@/player/constants/PlayerDefaults', () => ({
  DEFAULT_MAX_HEALTH: 100,
  DEFAULT_MAX_MANA: 100,
}));

vi.mock('@/player/ui/PlayerActor', () => ({
  PlayerActor: vi.fn(function (this: unknown) {}),
}));

vi.mock('@/hud/services/HudService', () => ({
  HudService: vi.fn(function (this: { initialize: typeof mockHudInitialize }) {
    this.initialize = mockHudInitialize;
  }),
}));

describe('OverworldScene', () => {
  it('sets camera zoom on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(scene.camera.zoom).toBe(1);
  });

  it('adds the tiled map to the scene on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(mockAddToScene).toHaveBeenCalledWith(scene);
  });

  it('initializes the HudService with player stats on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(mockHudInitialize).toHaveBeenCalledWith(expect.any(Object));
  });

  it('adds the PlayerActor to the scene on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    scene.onInitialize();
    expect(mockAdd).toHaveBeenCalledWith(expect.any(Object));
  });
});
