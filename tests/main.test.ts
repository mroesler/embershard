import { describe, it, expect, vi } from 'vitest';

const mockStart = vi.fn();
const mockGoToScene = vi.fn();
const mockAddScene = vi.fn();
const mockLoader = {};
const mockOverworldMap = {};

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

describe('main', () => {
  it('should add overworld scene with map, start with loader, and navigate to overworld', async () => {
    mockStart.mockResolvedValue(undefined);
    await import('@/main');
    expect(mockAddScene).toHaveBeenCalledWith('overworld', expect.any(Object));
    expect(mockStart).toHaveBeenCalledWith(mockLoader);
    await Promise.resolve(); // flush .then()
    expect(mockGoToScene).toHaveBeenCalledWith('overworld');
  });
});
