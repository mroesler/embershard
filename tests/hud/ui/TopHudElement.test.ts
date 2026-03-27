import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Excalibur mock ────────────────────────────────────────────────────────────
const mockGraphicsUse = vi.fn();
const mockSceneAdd = vi.fn();

vi.mock('excalibur', () => {
  class MockScreenElement {
    graphics = { use: mockGraphicsUse };
    constructor(_options?: unknown) {}
    onInitialize(_engine?: unknown): void {}
  }
  class MockRectangle {
    constructor(_options?: unknown) {}
  }
  class MockVector {
    constructor(public x: number, public y: number) {}
  }
  class MockText {
    constructor(_options?: unknown) {}
  }
  class MockFont {
    constructor(_options?: unknown) {}
  }
  return {
    ScreenElement: MockScreenElement,
    Rectangle: MockRectangle,
    Vector: MockVector,
    Text: MockText,
    Font: MockFont,
    FontUnit: { Px: 'px' },
    TextAlign: { Center: 'center' },
    BaseAlign: { Middle: 'middle' },
    Color: class MockColor {
      constructor(_r: number, _g: number, _b: number, _a?: number) {}
      static fromHex = vi.fn(() => ({}));
      static White = {};
    },
    Engine: class {},
  };
});

vi.mock('@/maps/constants/TileConfig', () => ({
  CANVAS_WIDTH: 1536,
  HUD_TOP_HEIGHT: 96,
}));

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('TopHudElement', () => {
  const fullStats = { currentHealth: 100, maxHealth: 100, currentMana: 100, maxMana: 100 };
  const mockEngine = { currentScene: { add: mockSceneAdd } };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('constructs without throwing given initial stats', async () => {
    const { TopHudElement } = await import('@/hud/ui/TopHudElement');
    expect(() => new TopHudElement(fullStats)).not.toThrow();
  });

  it('applies background graphic and adds fill and text elements on initialize', async () => {
    const { TopHudElement } = await import('@/hud/ui/TopHudElement');
    const element = new TopHudElement(fullStats);
    element.onInitialize(mockEngine as never);
    expect(mockGraphicsUse).toHaveBeenCalled();
    // healthBg, manaBg, healthFill, manaFill, healthText, manaText = 6 scene.add calls
    expect(mockSceneAdd).toHaveBeenCalledTimes(6);
  });

  it('calls graphics.use on fills and text when updateStats is called after initialize', async () => {
    const { TopHudElement } = await import('@/hud/ui/TopHudElement');
    const element = new TopHudElement(fullStats);
    element.onInitialize(mockEngine as never);
    vi.clearAllMocks();
    element.updateStats({ currentHealth: 50, maxHealth: 100, currentMana: 20, maxMana: 100 });
    // healthFill + manaFill + healthText + manaText = 4
    expect(mockGraphicsUse).toHaveBeenCalledTimes(4);
  });

  it('does not throw when updateStats is called before initialize', async () => {
    const { TopHudElement } = await import('@/hud/ui/TopHudElement');
    const element = new TopHudElement(fullStats);
    expect(() => element.updateStats({ currentHealth: 50, maxHealth: 100, currentMana: 20, maxMana: 100 })).not.toThrow();
  });
});
