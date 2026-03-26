/** Character walk speed in pixels per second at game resolution */
export const WALK_SPEED = 100;

/** Canvas width — must match the engine config in game.ts */
export const PLAY_AREA_WIDTH = 512;
/** Canvas height — must match the engine config in game.ts */
export const PLAY_AREA_HEIGHT = 256;

/** Character collision box width in pixels */
export const SPRITE_COLLISION_WIDTH = 16;
/** Character collision box height in pixels */
export const SPRITE_COLLISION_HEIGHT = 32;

/**
 * Playable area boundaries in world coordinates.
 * Camera at Vector.Zero shows world range [-PLAY_AREA_WIDTH/2, PLAY_AREA_WIDTH/2] x
 * [-PLAY_AREA_HEIGHT/2, PLAY_AREA_HEIGHT/2]. Half the sprite size is subtracted so the
 * character stays fully within the visible canvas.
 */
export const PLAYER_MIN_X = -PLAY_AREA_WIDTH / 2 + SPRITE_COLLISION_WIDTH / 2;
export const PLAYER_MAX_X = PLAY_AREA_WIDTH / 2 - SPRITE_COLLISION_WIDTH / 2;
export const PLAYER_MIN_Y = -PLAY_AREA_HEIGHT / 2 + SPRITE_COLLISION_HEIGHT / 2;
export const PLAYER_MAX_Y = PLAY_AREA_HEIGHT / 2 - SPRITE_COLLISION_HEIGHT / 2;
