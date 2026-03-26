import { describe, it, expect, vi } from 'vitest';

const mockStart = vi.fn();
const mockGoToScene = vi.fn();
const mockAddScene = vi.fn();
const mockAddResource = vi.fn();
const mockLoader = { addResource: mockAddResource };
const mockOverworldMap = {};
const mockCharacterImage = {};

vi.mock('@/game', () => ({
  game: { start: mockStart, addScene: mockAddScene, goToScene: mockGoToScene },
}));

vi.mock('@/maps/services/MapLoader', () => ({
  loader: mockLoader,
  overworldMap: mockOverworldMap,
}));

vi.mock('@/scenes/ui/OverworldScene', () => ({
  OverworldScene: vi.fn(function (this: unknown) {}),
}));

vi.mock('@/player/constants/PlayerAssets', () => ({
  playerCharacterImage: mockCharacterImage,
}));

describe('main', () => {
  it('adds playerCharacterImage to the loader', async () => {
    mockStart.mockResolvedValue(undefined);
    await import('@/main');
    expect(mockAddResource).toHaveBeenCalledWith(mockCharacterImage);
  });

  it('adds overworld scene with map, starts with loader, and navigates to overworld', async () => {
    mockStart.mockResolvedValue(undefined);
    await import('@/main');
    expect(mockAddScene).toHaveBeenCalledWith('overworld', expect.any(Object));
    expect(mockStart).toHaveBeenCalledWith(mockLoader);
    await Promise.resolve();
    expect(mockGoToScene).toHaveBeenCalledWith('overworld');
  });
});
