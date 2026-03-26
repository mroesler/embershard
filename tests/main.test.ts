import { describe, it, expect, vi } from 'vitest';

const mockStart = vi.fn();
const mockGoToScene = vi.fn();
const mockAddScene = vi.fn();

vi.mock('@/game', () => ({
  game: { start: mockStart, addScene: mockAddScene, goToScene: mockGoToScene },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.mock('@/scenes/ui/OverworldScene', () => ({
  OverworldScene: vi.fn(function (this: unknown) {}),
}));

describe('main', () => {
  it('should add overworld scene, start the game, and navigate to overworld', async () => {
    mockStart.mockResolvedValue(undefined);
    await import('@/main');
    expect(mockAddScene).toHaveBeenCalledWith('overworld', expect.any(Object));
    expect(mockStart).toHaveBeenCalledOnce();
    await Promise.resolve(); // flush .then()
    expect(mockGoToScene).toHaveBeenCalledWith('overworld');
  });
});
