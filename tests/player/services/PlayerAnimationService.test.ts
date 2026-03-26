import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetSprite = vi.fn((column: number, row: number) => ({ column, row, type: 'sprite' }));
const mockFromImageSource = vi.fn(() => ({ getSprite: mockGetSprite }));

vi.mock('excalibur', () => {
  return {
    SpriteSheet: { fromImageSource: mockFromImageSource },
    Animation: vi.fn(function (this: { options: unknown }, options: unknown) {
      this.options = options;
    }),
    Sprite: vi.fn(function (this: { options: unknown }, options: unknown) {
      this.options = options;
    }),
    AnimationStrategy: { Loop: 'loop', Freeze: 'freeze' },
  };
});

vi.mock('@/player/constants/PlayerSpriteConfig', () => ({
  WALK_FRAME_WIDTH: 16,
  WALK_FRAME_HEIGHT: 32,
  WALK_FRAME_COUNT: 4,
  WALK_FRAME_DURATION_MS: 150,
  ATTACK_FRAME_WIDTH: 32,
  ATTACK_FRAME_HEIGHT: 32,
  ATTACK_FRAME_COUNT: 4,
  ATTACK_FRAME_DURATION_MS: 100,
  WALK_DOWN_Y: 0,
  WALK_RIGHT_Y: 32,
  WALK_UP_Y: 64,
  WALK_LEFT_Y: 96,
  ATTACK_DOWN_Y: 128,
  ATTACK_UP_Y: 160,
  ATTACK_RIGHT_Y: 192,
  ATTACK_LEFT_Y: 224,
  WALK_SHEET_COLUMNS: 17,
  WALK_SHEET_ROWS: 8,
}));

describe('buildPlayerAnimations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a SpriteSheet with the correct walk grid', async () => {
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    const fakeImage = {};
    buildPlayerAnimations(fakeImage as never);
    expect(mockFromImageSource).toHaveBeenCalledWith({
      image: fakeImage,
      grid: { rows: 8, columns: 17, spriteWidth: 16, spriteHeight: 32 },
    });
  });

  it('returns walk animations for all four directions', async () => {
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    const { walkAnimations } = buildPlayerAnimations({} as never);
    expect(walkAnimations).toHaveProperty('down');
    expect(walkAnimations).toHaveProperty('right');
    expect(walkAnimations).toHaveProperty('up');
    expect(walkAnimations).toHaveProperty('left');
  });

  it('returns attack animations for all four directions', async () => {
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    const { attackAnimations } = buildPlayerAnimations({} as never);
    expect(attackAnimations).toHaveProperty('down');
    expect(attackAnimations).toHaveProperty('right');
    expect(attackAnimations).toHaveProperty('up');
    expect(attackAnimations).toHaveProperty('left');
  });

  it('returns idle sprites for all four directions', async () => {
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    const { idleSprites } = buildPlayerAnimations({} as never);
    expect(idleSprites).toHaveProperty('down');
    expect(idleSprites).toHaveProperty('right');
    expect(idleSprites).toHaveProperty('up');
    expect(idleSprites).toHaveProperty('left');
  });

  it('idle sprites use column 0 of the correct walk row for each direction', async () => {
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    buildPlayerAnimations({} as never);
    // WALK_DOWN_Y / WALK_FRAME_HEIGHT = 0, RIGHT = 1, UP = 2, LEFT = 3
    expect(mockGetSprite).toHaveBeenCalledWith(0, 0); // idle down
    expect(mockGetSprite).toHaveBeenCalledWith(0, 1); // idle right
    expect(mockGetSprite).toHaveBeenCalledWith(0, 2); // idle up
    expect(mockGetSprite).toHaveBeenCalledWith(0, 3); // idle left
  });

  it('walk animations contain 4 frames each using Loop strategy', async () => {
    const { Animation, AnimationStrategy } = await import('excalibur');
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    buildPlayerAnimations({} as never);

    // All Animation calls that use Loop should have 4 frames
    const animationCalls = vi.mocked(Animation).mock.calls;
    const loopCalls = animationCalls.filter(
      ([options]) => (options as { strategy: string }).strategy === AnimationStrategy.Loop,
    );
    for (const [options] of loopCalls) {
      expect((options as { frames: unknown[] }).frames).toHaveLength(4);
    }
  });

  it('attack animations contain 4 frames each using Freeze strategy', async () => {
    const { Animation, AnimationStrategy } = await import('excalibur');
    const { buildPlayerAnimations } = await import('@/player/services/PlayerAnimationService');
    buildPlayerAnimations({} as never);

    const animationCalls = vi.mocked(Animation).mock.calls;
    const freezeCalls = animationCalls.filter(
      ([options]) => (options as { strategy: string }).strategy === AnimationStrategy.Freeze,
    );
    expect(freezeCalls).toHaveLength(4); // one per direction
    for (const [options] of freezeCalls) {
      expect((options as { frames: unknown[] }).frames).toHaveLength(4);
    }
  });
});
