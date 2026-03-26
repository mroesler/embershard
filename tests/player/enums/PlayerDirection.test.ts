import { describe, it, expect } from 'vitest';
import { PlayerDirection } from '@/player/enums/PlayerDirection';

describe('PlayerDirection', () => {
  it('has Down value', () => {
    expect(PlayerDirection.Down).toBe('down');
  });

  it('has Right value', () => {
    expect(PlayerDirection.Right).toBe('right');
  });

  it('has Up value', () => {
    expect(PlayerDirection.Up).toBe('up');
  });

  it('has Left value', () => {
    expect(PlayerDirection.Left).toBe('left');
  });
});
