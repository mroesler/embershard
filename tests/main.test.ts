import { describe, it, expect, vi } from 'vitest';

const mockStart = vi.fn();

vi.mock('@/game', () => ({
  game: { start: mockStart },
}));

describe('main', () => {
  it('should call game.start() on load', async () => {
    await import('@/main');
    expect(mockStart).toHaveBeenCalledOnce();
  });
});
