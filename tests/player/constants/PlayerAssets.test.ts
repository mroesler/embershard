import { describe, it, expect, vi } from 'vitest';

vi.mock('excalibur', () => ({
  ImageSource: vi.fn(function (this: { path: string }, path: string) {
    this.path = path;
  }),
}));

describe('PlayerAssets', () => {
  it('creates an ImageSource for the character sprite sheet', async () => {
    const { ImageSource } = await import('excalibur');
    await import('@/player/constants/PlayerAssets');
    expect(ImageSource).toHaveBeenCalledWith('/assets/gfx/character.png');
  });

  it('exports a defined playerCharacterImage', async () => {
    const { playerCharacterImage } = await import('@/player/constants/PlayerAssets');
    expect(playerCharacterImage).toBeDefined();
  });
});
