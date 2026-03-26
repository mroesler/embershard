import { describe, it, expect, vi } from 'vitest';

vi.mock('excalibur', () => ({
  ScreenElement: class MockScreenElement {
    anchor = { x: 0, y: 0 };
    graphics = { use: vi.fn() };
  },
  Canvas: vi.fn(function (this: unknown, options: { draw: () => void }) {
    Object.assign(this as object, { draw: options.draw });
  }),
  Vector: { Zero: { x: 0, y: 0 } },
}));

const baseConfig = {
  x: 6,
  y: 5,
  width: 110,
  height: 16,
  fillColor: 'rgba(210, 30, 30, 0.9)',
  maxValue: 100,
};

describe('ResourceBar', () => {
  it('initialises current value to max value', async () => {
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    const bar = new ResourceBar(baseConfig);
    expect(bar.getCurrentValue()).toBe(100);
  });

  it('setCurrentValue updates the current value', async () => {
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    const bar = new ResourceBar(baseConfig);
    bar.setCurrentValue(60);
    expect(bar.getCurrentValue()).toBe(60);
  });

  it('setCurrentValue clamps to zero when given a negative value', async () => {
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    const bar = new ResourceBar(baseConfig);
    bar.setCurrentValue(-10);
    expect(bar.getCurrentValue()).toBe(0);
  });

  it('setCurrentValue clamps to maxValue when value exceeds it', async () => {
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    const bar = new ResourceBar(baseConfig);
    bar.setCurrentValue(999);
    expect(bar.getCurrentValue()).toBe(100);
  });

  it('registers the bar graphic on initialize', async () => {
    const { ResourceBar } = await import('@/hud/ui/ResourceBar');
    const { Canvas } = await import('excalibur');
    const bar = new ResourceBar(baseConfig);
    bar.onInitialize();
    expect(bar.graphics.use).toHaveBeenCalledWith(expect.any(Canvas as never));
  });
});
