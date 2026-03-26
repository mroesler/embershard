import { Actor, Engine, Keyboard, Keys, Vector } from 'excalibur';
import { PlayerStats } from '@/player/models/PlayerStats';
import { PlayerDirection } from '@/player/api/PlayerDirection';
import { PlayerState } from '@/player/api/PlayerState';
import { buildPlayerAnimations } from '@/player/services/PlayerAnimationService';
import { playerCharacterImage } from '@/player/constants/PlayerAssets';
import { playerEventBus } from '@/player/events/PlayerEventBus';
import {
  PLAYER_MAX_X,
  PLAYER_MAX_Y,
  PLAYER_MIN_X,
  PLAYER_MIN_Y,
  SPRITE_COLLISION_HEIGHT,
  SPRITE_COLLISION_WIDTH,
  WALK_SPEED,
} from '@/player/constants/PlayerMovement';
import {
  ATTACK_FRAME_COUNT,
  ATTACK_FRAME_DURATION_MS,
} from '@/player/constants/PlayerSpriteConfig';

const ATTACK_TOTAL_DURATION_MS = ATTACK_FRAME_COUNT * ATTACK_FRAME_DURATION_MS;

export class PlayerActor extends Actor {
  private facingDirection: PlayerDirection = PlayerDirection.Down;
  private actorState: PlayerState = PlayerState.Idle;
  private attackElapsedTime = 0;
  private readonly playerStats: PlayerStats;

  constructor(playerStats: PlayerStats) {
    super({
      pos: Vector.Zero,
      width: SPRITE_COLLISION_WIDTH,
      height: SPRITE_COLLISION_HEIGHT,
      anchor: new Vector(0.5, 0.5),
    });
    this.playerStats = playerStats;
  }

  override onInitialize(_engine: Engine): void {
    const animations = buildPlayerAnimations(playerCharacterImage);
    const directions = [
      PlayerDirection.Down,
      PlayerDirection.Right,
      PlayerDirection.Up,
      PlayerDirection.Left,
    ];
    for (const direction of directions) {
      this.graphics.add(`walk-${direction}`, animations.walkAnimations[direction]);
      this.graphics.add(`attack-${direction}`, animations.attackAnimations[direction]);
      this.graphics.add(`idle-${direction}`, animations.idleSprites[direction]);
    }
    this.graphics.use(`idle-${this.facingDirection}`);
    playerEventBus.emit('statsChanged', { stats: this.playerStats });
  }

  override onPreUpdate(engine: Engine, elapsedMs: number): void {
    if (this.actorState === PlayerState.Attacking) {
      this.attackElapsedTime += elapsedMs;
      if (this.attackElapsedTime >= ATTACK_TOTAL_DURATION_MS) {
        this.exitAttackState();
      }
      return;
    }

    const keyboard = engine.input.keyboard;

    if (keyboard.wasPressed(Keys.Space)) {
      this.enterAttackState();
      return;
    }

    this.processMovement(keyboard);
  }

  override onPostUpdate(_engine: Engine, _elapsedMs: number): void {
    this.pos.x = Math.max(PLAYER_MIN_X, Math.min(PLAYER_MAX_X, this.pos.x));
    this.pos.y = Math.max(PLAYER_MIN_Y, Math.min(PLAYER_MAX_Y, this.pos.y));
  }

  private enterAttackState(): void {
    this.actorState = PlayerState.Attacking;
    this.attackElapsedTime = 0;
    this.vel = Vector.Zero;
    this.graphics.use(`attack-${this.facingDirection}`);
  }

  private exitAttackState(): void {
    this.actorState = PlayerState.Idle;
    this.attackElapsedTime = 0;
    this.graphics.use(`idle-${this.facingDirection}`);
  }

  private processMovement(keyboard: Keyboard): void {
    let velocityX = 0;
    let velocityY = 0;
    let newDirection = this.facingDirection;

    if (keyboard.isHeld(Keys.A) || keyboard.isHeld(Keys.ArrowLeft)) {
      velocityX = -WALK_SPEED;
      newDirection = PlayerDirection.Left;
    } else if (keyboard.isHeld(Keys.D) || keyboard.isHeld(Keys.ArrowRight)) {
      velocityX = WALK_SPEED;
      newDirection = PlayerDirection.Right;
    }

    if (keyboard.isHeld(Keys.W) || keyboard.isHeld(Keys.ArrowUp)) {
      velocityY = -WALK_SPEED;
      if (velocityX === 0) newDirection = PlayerDirection.Up;
    } else if (keyboard.isHeld(Keys.S) || keyboard.isHeld(Keys.ArrowDown)) {
      velocityY = WALK_SPEED;
      if (velocityX === 0) newDirection = PlayerDirection.Down;
    }

    this.vel = new Vector(velocityX, velocityY);

    const isMoving = velocityX !== 0 || velocityY !== 0;
    const newState = isMoving ? PlayerState.Walking : PlayerState.Idle;

    if (newDirection !== this.facingDirection || newState !== this.actorState) {
      this.facingDirection = newDirection;
      this.actorState = newState;
      const animationKey = isMoving
        ? `walk-${this.facingDirection}`
        : `idle-${this.facingDirection}`;
      this.graphics.use(animationKey);
    }
  }
}
