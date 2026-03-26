import { describe, it, expect, vi } from 'vitest';

vi.mock('excalibur', () => {
  class MockEventEmitter {
    private readonly listeners: Record<string, ((...args: unknown[]) => void)[]> = {};
    on(event: string, handler: (...args: unknown[]) => void) {
      this.listeners[event] = this.listeners[event] ?? [];
      this.listeners[event].push(handler);
      return { close: () => this.off(event, handler) };
    }
    off(event: string, handler: (...args: unknown[]) => void) {
      this.listeners[event] = (this.listeners[event] ?? []).filter(h => h !== handler);
    }
    emit(event: string, data: unknown) {
      (this.listeners[event] ?? []).forEach(handler => handler(data));
    }
  }
  return { EventEmitter: MockEventEmitter };
});

describe('playerEventBus', () => {
  it('delivers statsChanged events to subscribers', async () => {
    const { playerEventBus } = await import('@/player/events/PlayerEventBus');
    const fakeStats = { currentHealth: 90, maxHealth: 100, currentMana: 40, maxMana: 100 };
    const handler = vi.fn();
    playerEventBus.on('statsChanged', handler);
    playerEventBus.emit('statsChanged', { stats: fakeStats as never });
    expect(handler).toHaveBeenCalledWith({ stats: fakeStats });
  });
});
