import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Excalibur mock ────────────────────────────────────────────────────────────
const mockGraphicsUse = vi.fn();

vi.mock('excalibur', () => {
  class MockScreenElement {
    graphics = { use: mockGraphicsUse };
    constructor(_options?: unknown) {}
    onInitialize(): void {}
  }
  class MockRectangle {
    constructor(_options?: unknown) {}
  }
  class MockVector {
    constructor(
      public x: number,
      public y: number,
    ) {}
  }
  return {
    ScreenElement: MockScreenElement,
    Rectangle: MockRectangle,
    Vector: MockVector,
    Color: { Black: 'black' },
  };
});

vi.mock('@/maps/constants/TileConfig', () => ({
  CANVAS_WIDTH: 1536,
  HUD_TOP_HEIGHT: 96,
  GAME_AREA_HEIGHT: 768,
  HUD_BOTTOM_HEIGHT: 192,
}));

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('BottomHudElement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('constructs without throwing', async () => {
    const { BottomHudElement } = await import('@/hud/ui/BottomHudElement');
    expect(() => new BottomHudElement()).not.toThrow();
  });

  it('applies a rectangle graphic on initialize', async () => {
    const { BottomHudElement } = await import('@/hud/ui/BottomHudElement');
    const element = new BottomHudElement();
    element.onInitialize();
    expect(mockGraphicsUse).toHaveBeenCalledOnce();
  });
});
