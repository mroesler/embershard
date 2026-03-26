import { describe, it, expect } from 'vitest';
import { PlayerStats } from '@/player/models/PlayerStats';

describe('PlayerStats', () => {
  it('sets current health to max on construction', () => {
    const stats = new PlayerStats(100, 50);
    expect(stats.currentHealth).toBe(100);
    expect(stats.maxHealth).toBe(100);
  });

  it('sets current mana to max on construction', () => {
    const stats = new PlayerStats(100, 50);
    expect(stats.currentMana).toBe(50);
    expect(stats.maxMana).toBe(50);
  });

  it('allows current health to be mutated independently of max', () => {
    const stats = new PlayerStats(100, 50);
    stats.currentHealth = 40;
    expect(stats.currentHealth).toBe(40);
    expect(stats.maxHealth).toBe(100);
  });

  it('allows current mana to be mutated independently of max', () => {
    const stats = new PlayerStats(100, 50);
    stats.currentMana = 10;
    expect(stats.currentMana).toBe(10);
    expect(stats.maxMana).toBe(50);
  });
});
