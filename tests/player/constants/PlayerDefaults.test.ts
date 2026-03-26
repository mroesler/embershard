import { describe, it, expect } from 'vitest';
import { DEFAULT_MAX_HEALTH, DEFAULT_MAX_MANA } from '@/player/constants/PlayerDefaults';

describe('PlayerDefaults', () => {
  it('default max health is 100', () => {
    expect(DEFAULT_MAX_HEALTH).toBe(100);
  });

  it('default max mana is 100', () => {
    expect(DEFAULT_MAX_MANA).toBe(100);
  });
});
