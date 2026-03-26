import { describe, it, expect } from 'vitest';
import type { StatsSnapshot } from '@/hud/interfaces/StatsSnapshot';

describe('StatsSnapshot', () => {
  it('accepts an object with the expected shape', () => {
    const snapshot: StatsSnapshot = {
      currentHealth: 80,
      maxHealth: 100,
      currentMana: 50,
      maxMana: 100,
    };
    expect(snapshot.currentHealth).toBe(80);
    expect(snapshot.maxHealth).toBe(100);
    expect(snapshot.currentMana).toBe(50);
    expect(snapshot.maxMana).toBe(100);
  });
});
