import { describe, it, expect } from 'vitest';
import type { PlayerStatsChangedEvent } from '@/player/events/PlayerStatsChangedEvent';

describe('PlayerStatsChangedEvent', () => {
  it('holds a readonly stats reference', () => {
    const fakeStats = { currentHealth: 80, maxHealth: 100, currentMana: 50, maxMana: 100 };
    const event: PlayerStatsChangedEvent = { stats: fakeStats as never };
    expect(event.stats).toBe(fakeStats);
  });
});
