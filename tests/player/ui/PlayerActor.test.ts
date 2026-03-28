import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Excalibur mock ────────────────────────────────────────────────────────────
const mockGraphicsAdd = vi.fn();
const mockGraphicsUse = vi.fn();
const mockAnimationReset = vi.fn();

vi.mock('excalibur', () => {
  class MockAnimation {
    reset = mockAnimationReset;
  }
  const mockCurrentAnimation = new MockAnimation();
  class MockActor {
    pos = { x: 0, y: 0 };
    vel = { x: 0, y: 0 };
    graphics = { add: mockGraphicsAdd, use: mockGraphicsUse, current: mockCurrentAnimation };
    constructor(_options?: unknown) {}
    onInitialize(_engine: unknown): void {}
    onPreUpdate(_engine: unknown, _elapsed: number): void {}
    onPostUpdate(_engine: unknown, _elapsed: number): void {}
  }
  const Keys = {
    A: 'KeyA', D: 'KeyD', W: 'KeyW', S: 'KeyS', Space: 'Space',
    ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown',
  };
  class MockVector {
    constructor(
      public x: number,
      public y: number,
    ) {}
    static Zero = new MockVector(0, 0);
  }
  return { Actor: MockActor, Animation: MockAnimation, Keys, Vector: MockVector, Keyboard: class {} };
});

// ── Dependency mocks ──────────────────────────────────────────────────────────
const mockWalkDown = { type: 'anim', dir: 'down', mode: 'walk' };
const mockWalkRight = { type: 'anim', dir: 'right', mode: 'walk' };
const mockWalkUp = { type: 'anim', dir: 'up', mode: 'walk' };
const mockWalkLeft = { type: 'anim', dir: 'left', mode: 'walk' };
const mockAttackDown = { type: 'anim', dir: 'down', mode: 'attack' };
const mockAttackRight = { type: 'anim', dir: 'right', mode: 'attack' };
const mockAttackUp = { type: 'anim', dir: 'up', mode: 'attack' };
const mockAttackLeft = { type: 'anim', dir: 'left', mode: 'attack' };
const mockIdleDown = { type: 'sprite', dir: 'down' };
const mockIdleRight = { type: 'sprite', dir: 'right' };
const mockIdleUp = { type: 'sprite', dir: 'up' };
const mockIdleLeft = { type: 'sprite', dir: 'left' };

const mockBuildPlayerAnimations = vi.fn(() => ({
  walkAnimations: {
    down: mockWalkDown, right: mockWalkRight, up: mockWalkUp, left: mockWalkLeft,
  },
  attackAnimations: {
    down: mockAttackDown, right: mockAttackRight, up: mockAttackUp, left: mockAttackLeft,
  },
  idleSprites: {
    down: mockIdleDown, right: mockIdleRight, up: mockIdleUp, left: mockIdleLeft,
  },
}));

vi.mock('@/player/services/PlayerAnimationService', () => ({
  buildPlayerAnimations: mockBuildPlayerAnimations,
}));

vi.mock('@/player/constants/PlayerAssets', () => ({
  playerCharacterImage: {},
}));

const mockEmit = vi.fn();
vi.mock('@/player/events/PlayerEventBus', () => ({
  playerEventBus: { emit: mockEmit, on: vi.fn() },
}));

vi.mock('@/player/constants/PlayerMovement', () => ({
  WALK_SPEED: 100,
  PLAY_AREA_WIDTH: 512,
  PLAY_AREA_HEIGHT: 256,
  SPRITE_COLLISION_WIDTH: 16,
  SPRITE_COLLISION_HEIGHT: 32,
  PLAYER_MIN_X: 8,
  PLAYER_MAX_X: 504,
  PLAYER_MIN_Y: 16,
  PLAYER_MAX_Y: 240,
}));

vi.mock('@/player/constants/PlayerSpriteConfig', () => ({
  ATTACK_FRAME_COUNT: 4,
  ATTACK_FRAME_DURATION_MS: 100,
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeKeyboard(held: string[] = [], pressed: string[] = []) {
  return {
    isHeld: (key: string) => held.includes(key),
    wasPressed: (key: string) => pressed.includes(key),
  };
}

function makeEngine(held: string[] = [], pressed: string[] = []) {
  return { input: { keyboard: makeKeyboard(held, pressed) } };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('PlayerActor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── construction ────────────────────────────────────────────────────────────

  it('constructs without throwing', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    expect(() => new PlayerActor(new PlayerStats(100, 100))).not.toThrow();
  });

  // ── onInitialize ────────────────────────────────────────────────────────────

  it('registers 12 named graphics on initialize (4 walk + 4 attack + 4 idle)', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    expect(mockGraphicsAdd).toHaveBeenCalledTimes(12);
  });

  it('uses idle-down graphic after initialize', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    expect(mockGraphicsUse).toHaveBeenCalledWith('idle-down');
  });

  it('emits statsChanged on initialize', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const stats = new PlayerStats(100, 100);
    const actor = new PlayerActor(stats);
    actor.onInitialize(makeEngine() as never);
    expect(mockEmit).toHaveBeenCalledWith('statsChanged', { stats });
  });

  // ── movement — WASD ─────────────────────────────────────────────────────────

  it('moves left and switches to walk-left when A is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyA']) as never, 16);
    expect(actor.vel).toEqual({ x: -100, y: 0 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-left');
  });

  it('moves right and switches to walk-right when D is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16);
    expect(actor.vel).toEqual({ x: 100, y: 0 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-right');
  });

  it('moves up and switches to walk-up when W is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyW']) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: -100 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-up');
  });

  it('moves down and switches to walk-down when S is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyS']) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: 100 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-down');
  });

  // ── movement — arrow keys ───────────────────────────────────────────────────

  it('moves left when ArrowLeft is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['ArrowLeft']) as never, 16);
    expect(actor.vel).toEqual({ x: -100, y: 0 });
  });

  it('moves right when ArrowRight is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['ArrowRight']) as never, 16);
    expect(actor.vel).toEqual({ x: 100, y: 0 });
  });

  it('moves up when ArrowUp is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['ArrowUp']) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: -100 });
  });

  it('moves down when ArrowDown is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['ArrowDown']) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: 100 });
  });

  // ── movement — diagonal ─────────────────────────────────────────────────────

  it('moves diagonally with both horizontal and vertical keys; horizontal wins facing', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyA', 'KeyW']) as never, 16);
    expect(actor.vel).toEqual({ x: -100, y: -100 });
    // horizontal keys set direction first, so facing = left
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-left');
  });

  it('vertical key sets direction when no horizontal key is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyS']) as never, 16);
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-down');
  });

  it('horizontal direction wins over down direction when both D and S are held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyD', 'KeyS']) as never, 16);
    expect(actor.vel).toEqual({ x: 100, y: 100 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('walk-right');
  });

  // ── idle ────────────────────────────────────────────────────────────────────

  it('zeroes velocity and plays idle graphic when no key is held', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    // First move right to change state away from initial idle-down
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16);
    mockGraphicsUse.mockClear();
    // Then release
    actor.onPreUpdate(makeEngine([]) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: 0 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('idle-right');
  });

  it('does not call graphics.use when direction and state are unchanged', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16); // walk-right
    mockGraphicsUse.mockClear();
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16); // still walk-right
    expect(mockGraphicsUse).not.toHaveBeenCalled();
  });

  // ── attack state machine ────────────────────────────────────────────────────

  it('enters attack state when Space is pressed', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16);
    expect(actor.vel).toEqual({ x: 0, y: 0 });
    expect(mockGraphicsUse).toHaveBeenCalledWith('attack-down');
  });

  it('blocks movement input while attacking', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16); // enter attack
    mockGraphicsUse.mockClear();
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16); // D held but ignored
    expect(actor.vel).toEqual({ x: 0, y: 0 });
    expect(mockGraphicsUse).not.toHaveBeenCalled();
  });

  it('exits attack and returns to idle after full attack duration', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16); // enter attack
    mockGraphicsUse.mockClear();
    // Simulate enough elapsed time to finish the attack (4 frames × 100ms = 400ms)
    actor.onPreUpdate(makeEngine([]) as never, 400);
    expect(mockGraphicsUse).toHaveBeenCalledWith('idle-down');
  });

  it('remains attacking when attack duration has not fully elapsed', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16);
    mockGraphicsUse.mockClear();
    actor.onPreUpdate(makeEngine([]) as never, 100); // 100ms < 400ms total
    expect(mockGraphicsUse).not.toHaveBeenCalled();
  });

  it('resets the attack animation on every attack so all frames play from the start', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16); // first attack
    expect(mockAnimationReset).toHaveBeenCalledTimes(1);
    actor.onPreUpdate(makeEngine([]) as never, 400); // finish attack
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16); // second attack
    expect(mockAnimationReset).toHaveBeenCalledTimes(2);
  });

  it('attacks in the current facing direction', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.onInitialize(makeEngine() as never);
    actor.onPreUpdate(makeEngine(['KeyD']) as never, 16); // face right
    actor.onPreUpdate(makeEngine([], ['Space']) as never, 16); // attack
    expect(mockGraphicsUse).toHaveBeenCalledWith('attack-right');
  });

  // ── boundary clamping ───────────────────────────────────────────────────────

  it('clamps pos.x to PLAYER_MIN_X when beyond left edge', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.x = -999;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.x).toBe(8);
  });

  it('clamps pos.x to PLAYER_MAX_X when beyond right edge', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.x = 999;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.x).toBe(504);
  });

  it('leaves pos.x unchanged when within bounds', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.x = 256;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.x).toBe(256);
  });

  it('clamps pos.y to PLAYER_MIN_Y when beyond top edge', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.y = -999;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.y).toBe(16);
  });

  it('clamps pos.y to PLAYER_MAX_Y when beyond bottom edge', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.y = 999;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.y).toBe(240);
  });

  it('leaves pos.y unchanged when within bounds', async () => {
    const { PlayerActor } = await import('@/player/ui/PlayerActor');
    const { PlayerStats } = await import('@/player/models/PlayerStats');
    const actor = new PlayerActor(new PlayerStats(100, 100));
    actor.pos.y = 128;
    actor.onPostUpdate(makeEngine() as never, 16);
    expect(actor.pos.y).toBe(128);
  });
});
