import { describe, it, expect, vi } from 'vitest';

vi.mock('@/maps/constants/TileConfig', () => ({
  CANVAS_WIDTH: 512,
  CANVAS_HEIGHT: 352,
}));

vi.mock('excalibur', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockEngine = vi.fn(function (this: any, _config: unknown) { Object.assign(this, {}); });
  return {
    Engine: MockEngine,
    DisplayMode: { Fixed: 'Fixed', FitScreen: 'FitScreen', FitScreenAndFill: 'FitScreenAndFill' },
    Color: { Black: '#000000' },
  };
});

describe('game', () => {
  it('should export a defined game instance', async () => {
    const { game } = await import('@/game');
    expect(game).toBeDefined();
  });

  it('should construct Engine with the correct configuration', async () => {
    const { Engine, DisplayMode, Color } = await import('excalibur');
    expect(Engine).toHaveBeenCalledOnce();
    expect(Engine).toHaveBeenCalledWith({
      canvasElementId: 'game',
      width: 512,
      height: 352,
      displayMode: DisplayMode.Fixed,
      backgroundColor: Color.Black,
      pixelArt: true,
    });
  });
});
