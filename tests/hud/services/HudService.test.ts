import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Capture statsChanged handler ──────────────────────────────────────────────
let capturedStatsChangedHandler: ((event: { stats: unknown }) => void) | null = null;

vi.mock('@/player/events/PlayerEventBus', () => ({
  playerEventBus: {
    on: vi.fn((event: string, handler: (e: { stats: unknown }) => void) => {
      if (event === 'statsChanged') capturedStatsChangedHandler = handler;
    }),
  },
}));

// ── HUD element mocks ─────────────────────────────────────────────────────────
const mockTopHudUpdateStats = vi.fn();
const mockBottomHudConstructed = vi.fn();

vi.mock('@/hud/ui/TopHudElement', () => ({
  TopHudElement: vi.fn(function (this: { updateStats: typeof mockTopHudUpdateStats }) {
    this.updateStats = mockTopHudUpdateStats;
  }),
}));

vi.mock('@/hud/ui/BottomHudElement', () => ({
  BottomHudElement: vi.fn(function (this: unknown) {
    mockBottomHudConstructed();
  }),
}));

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('HudService', () => {
  const mockAdd = vi.fn();
  const mockScene = { add: mockAdd };
  const fullStats = { currentHealth: 100, maxHealth: 100, currentMana: 100, maxMana: 100 };

  beforeEach(() => {
    capturedStatsChangedHandler = null;
    vi.clearAllMocks();
  });

  it('adds TopHudElement and BottomHudElement to the scene on initialize', async () => {
    const { HudService } = await import('@/hud/services/HudService');
    const service = new HudService();
    service.initialize(mockScene as never, fullStats);
    expect(mockAdd).toHaveBeenCalledTimes(2);
  });

  it('subscribes to statsChanged on playerEventBus during initialize', async () => {
    const { HudService } = await import('@/hud/services/HudService');
    const { playerEventBus } = await import('@/player/events/PlayerEventBus');
    const service = new HudService();
    service.initialize(mockScene as never, fullStats);
    expect(playerEventBus.on).toHaveBeenCalledWith('statsChanged', expect.any(Function));
  });

  it('forwards statsChanged events to TopHudElement.updateStats', async () => {
    const { HudService } = await import('@/hud/services/HudService');
    const service = new HudService();
    service.initialize(mockScene as never, fullStats);
    const newStats = { currentHealth: 50, maxHealth: 100, currentMana: 20, maxMana: 100 };
    capturedStatsChangedHandler?.({ stats: newStats });
    expect(mockTopHudUpdateStats).toHaveBeenCalledWith(newStats);
  });
});
