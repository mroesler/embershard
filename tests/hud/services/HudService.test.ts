import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── playerEventBus mock ───────────────────────────────────────────────────────
let capturedStatsChangedHandler: ((event: { stats: unknown }) => void) | null = null;

vi.mock('@/player/events/PlayerEventBus', () => ({
  playerEventBus: {
    on: vi.fn((event: string, handler: (e: { stats: unknown }) => void) => {
      if (event === 'statsChanged') capturedStatsChangedHandler = handler;
    }),
  },
}));

// ── DOM helpers ───────────────────────────────────────────────────────────────
function makeDomElements() {
  const healthFill = document.createElement('div');
  const manaFill = document.createElement('div');
  const healthLabel = document.createElement('span');
  const manaLabel = document.createElement('span');

  healthFill.id = 'health-fill';
  manaFill.id = 'mana-fill';
  healthLabel.id = 'health-label';
  manaLabel.id = 'mana-label';

  document.body.append(healthFill, manaFill, healthLabel, manaLabel);
  return { healthFill, manaFill, healthLabel, manaLabel };
}

function cleanDom() {
  ['health-fill', 'mana-fill', 'health-label', 'mana-label'].forEach(id => {
    document.getElementById(id)?.remove();
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('HudService', () => {
  beforeEach(() => {
    cleanDom();
    capturedStatsChangedHandler = null;
    vi.clearAllMocks();
  });

  it('throws when a required DOM element is missing', async () => {
    const { HudService } = await import('@/hud/services/HudService');
    // No DOM elements added → constructor should throw
    expect(() => new HudService()).toThrow('HUD element not found: #health-fill');
  });

  it('renders initial stats immediately on initialize', async () => {
    const { healthFill, manaFill, healthLabel, manaLabel } = makeDomElements();
    const { HudService } = await import('@/hud/services/HudService');
    const service = new HudService();
    service.initialize({ currentHealth: 75, maxHealth: 100, currentMana: 40, maxMana: 100 });
    expect(healthFill.style.width).toBe('75%');
    expect(manaFill.style.width).toBe('40%');
    expect(healthLabel.textContent).toBe('75/100');
    expect(manaLabel.textContent).toBe('40/100');
  });

  it('subscribes to statsChanged on playerEventBus during initialize', async () => {
    makeDomElements();
    const { HudService } = await import('@/hud/services/HudService');
    const { playerEventBus } = await import('@/player/events/PlayerEventBus');
    const service = new HudService();
    service.initialize({ currentHealth: 100, maxHealth: 100, currentMana: 100, maxMana: 100 });
    expect(playerEventBus.on).toHaveBeenCalledWith('statsChanged', expect.any(Function));
  });

  it('re-renders bars when a statsChanged event is received', async () => {
    const { healthFill, manaFill, healthLabel, manaLabel } = makeDomElements();
    const { HudService } = await import('@/hud/services/HudService');
    const service = new HudService();
    service.initialize({ currentHealth: 100, maxHealth: 100, currentMana: 100, maxMana: 100 });

    // Simulate event bus firing
    capturedStatsChangedHandler?.({
      stats: { currentHealth: 50, maxHealth: 100, currentMana: 20, maxMana: 100 },
    });

    expect(healthFill.style.width).toBe('50%');
    expect(manaFill.style.width).toBe('20%');
    expect(healthLabel.textContent).toBe('50/100');
    expect(manaLabel.textContent).toBe('20/100');
  });

  it('renders 100% bars when stats are at full values', async () => {
    const { healthFill, manaFill } = makeDomElements();
    const { HudService } = await import('@/hud/services/HudService');
    const service = new HudService();
    service.initialize({ currentHealth: 100, maxHealth: 100, currentMana: 100, maxMana: 100 });
    expect(healthFill.style.width).toBe('100%');
    expect(manaFill.style.width).toBe('100%');
  });
});
