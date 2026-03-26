import { Animation, AnimationStrategy, ImageSource, Sprite, SpriteSheet } from 'excalibur';
import { PlayerDirection } from '@/player/enums/PlayerDirection';
import {
  ATTACK_FRAME_COUNT,
  ATTACK_FRAME_DURATION_MS,
  ATTACK_FRAME_HEIGHT,
  ATTACK_FRAME_WIDTH,
  ATTACK_DOWN_Y,
  ATTACK_LEFT_Y,
  ATTACK_RIGHT_Y,
  ATTACK_UP_Y,
  WALK_DOWN_Y,
  WALK_FRAME_COUNT,
  WALK_FRAME_DURATION_MS,
  WALK_FRAME_HEIGHT,
  WALK_FRAME_WIDTH,
  WALK_LEFT_Y,
  WALK_RIGHT_Y,
  WALK_SHEET_COLUMNS,
  WALK_SHEET_ROWS,
  WALK_UP_Y,
} from '@/player/constants/PlayerSpriteConfig';

export interface DirectionalAnimations {
  readonly walkAnimations: Record<PlayerDirection, Animation>;
  readonly attackAnimations: Record<PlayerDirection, Animation>;
  readonly idleSprites: Record<PlayerDirection, Sprite>;
}

const DIRECTIONS = [
  PlayerDirection.Down,
  PlayerDirection.Right,
  PlayerDirection.Up,
  PlayerDirection.Left,
] as const;

const walkSheetRowByDirection: Record<PlayerDirection, number> = {
  [PlayerDirection.Down]: WALK_DOWN_Y / WALK_FRAME_HEIGHT,
  [PlayerDirection.Right]: WALK_RIGHT_Y / WALK_FRAME_HEIGHT,
  [PlayerDirection.Up]: WALK_UP_Y / WALK_FRAME_HEIGHT,
  [PlayerDirection.Left]: WALK_LEFT_Y / WALK_FRAME_HEIGHT,
};

const attackYByDirection: Record<PlayerDirection, number> = {
  [PlayerDirection.Down]: ATTACK_DOWN_Y,
  [PlayerDirection.Up]: ATTACK_UP_Y,
  [PlayerDirection.Right]: ATTACK_RIGHT_Y,
  [PlayerDirection.Left]: ATTACK_LEFT_Y,
};

function buildWalkAnimation(spriteSheet: SpriteSheet, sheetRow: number): Animation {
  return new Animation({
    frames: Array.from({ length: WALK_FRAME_COUNT }, (_, frameIndex) => ({
      graphic: spriteSheet.getSprite(frameIndex, sheetRow),
      duration: WALK_FRAME_DURATION_MS,
    })),
    strategy: AnimationStrategy.Loop,
  });
}

function buildAttackAnimation(image: ImageSource, attackY: number): Animation {
  return new Animation({
    frames: Array.from({ length: ATTACK_FRAME_COUNT }, (_, frameIndex) => ({
      graphic: new Sprite({
        image,
        sourceView: {
          x: frameIndex * ATTACK_FRAME_WIDTH,
          y: attackY,
          width: ATTACK_FRAME_WIDTH,
          height: ATTACK_FRAME_HEIGHT,
        },
      }),
      duration: ATTACK_FRAME_DURATION_MS,
    })),
    strategy: AnimationStrategy.Freeze,
  });
}

export function buildPlayerAnimations(image: ImageSource): DirectionalAnimations {
  const walkSpriteSheet = SpriteSheet.fromImageSource({
    image,
    grid: {
      rows: WALK_SHEET_ROWS,
      columns: WALK_SHEET_COLUMNS,
      spriteWidth: WALK_FRAME_WIDTH,
      spriteHeight: WALK_FRAME_HEIGHT,
    },
  });

  const walkAnimations = Object.fromEntries(
    DIRECTIONS.map((direction) => [
      direction,
      buildWalkAnimation(walkSpriteSheet, walkSheetRowByDirection[direction]),
    ])
  ) as Record<PlayerDirection, Animation>;

  const attackAnimations = Object.fromEntries(
    DIRECTIONS.map((direction) => [
      direction,
      buildAttackAnimation(image, attackYByDirection[direction]),
    ])
  ) as Record<PlayerDirection, Animation>;

  const idleSprites = Object.fromEntries(
    DIRECTIONS.map((direction) => [
      direction,
      walkSpriteSheet.getSprite(0, walkSheetRowByDirection[direction]),
    ])
  ) as Record<PlayerDirection, Sprite>;

  return { walkAnimations, attackAnimations, idleSprites };
}
