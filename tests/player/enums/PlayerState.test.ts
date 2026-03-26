import { describe, it, expect } from 'vitest';
import { PlayerState } from '@/player/enums/PlayerState';

describe('PlayerState', () => {
  it('has Idle value', () => {
    expect(PlayerState.Idle).toBe('idle');
  });

  it('has Walking value', () => {
    expect(PlayerState.Walking).toBe('walking');
  });

  it('has Attacking value', () => {
    expect(PlayerState.Attacking).toBe('attacking');
  });
});
