import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockAddToScene = vi.fn();
const mockAdd = vi.fn();

vi.mock('excalibur', () => ({
  Scene: class MockScene {
    camera = { zoom: 0 };
    add = mockAdd;
  },
  ScreenElement: class MockScreenElement {
    anchor = { x: 0, y: 0 };
    graphics = { use: vi.fn() };
  },
  Canvas: vi.fn(function (this: unknown) {}),
  Vector: { Zero: { x: 0, y: 0 } },
}));

vi.mock('@excaliburjs/plugin-tiled', () => ({
  TiledResource: vi.fn(),
}));

vi.mock('@/maps/constants/TileConfig', () => ({
  CAMERA_ZOOM: 1,
}));

vi.mock('@/player/models/PlayerStats', () => ({
  PlayerStats: vi.fn(function (this: unknown, maxHealth: number, maxMana: number) {
    Object.assign(this as object, {
      maxHealth,
      maxMana,
      currentHealth: maxHealth,
      currentMana: maxMana,
    });
  }),
}));

vi.mock('@/player/constants/PlayerDefaults', () => ({
  DEFAULT_MAX_HEALTH: 100,
  DEFAULT_MAX_MANA: 100,
}));

vi.mock('@/hud/ui/ResourceBar', () => ({
  ResourceBar: vi.fn(function (this: unknown) {
    Object.assign(this as object, { getCurrentValue: vi.fn(() => 100) });
  }),
}));

describe('OverworldScene', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('creates a health bar and mana bar', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    new OverworldScene({ addToScene: mockAddToScene } as never);
    expect(ResourceBar).toHaveBeenCalledTimes(2);
  });

  it('adds health bar and mana bar to the scene on initialize', async () => {
    const { OverworldScene } = await import('@/scenes/ui/OverworldScene');
    const scene = new OverworldScene({ addToScene: mockAddToScene } as never);
    mockAdd.mockClear();
    scene.onInitialize();
    expect(mockAdd).toHaveBeenCalledTimes(2);
    expect(mockAdd).toHaveBeenCalledWith(scene.healthBar);
    expect(mockAdd).toHaveBeenCalledWith(scene.manaBar);
  });
});
