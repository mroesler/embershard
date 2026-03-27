/** Character walk speed in pixels per second at game resolution */
export const WALK_SPEED = 100;

/** Game playfield width in pixels — must match CANVAS_WIDTH in TileConfig */
export const PLAY_AREA_WIDTH = 512;
/** Game playfield height in pixels — must match GAME_AREA_HEIGHT in TileConfig */
export const PLAY_AREA_HEIGHT = 256;

/** Character collision box width in pixels */
export const SPRITE_COLLISION_WIDTH = 16;
/** Character collision box height in pixels */
export const SPRITE_COLLISION_HEIGHT = 32;

/**
 * Playable area boundaries in world coordinates.
 * The Tiled map occupies world (0, 0) to (PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT).
 * Half the sprite collision size is inset so the character stays fully within the map.
 */
export const PLAYER_MIN_X = SPRITE_COLLISION_WIDTH / 2;
export const PLAYER_MAX_X = PLAY_AREA_WIDTH - SPRITE_COLLISION_WIDTH / 2;
export const PLAYER_MIN_Y = SPRITE_COLLISION_HEIGHT / 2;
export const PLAYER_MAX_Y = PLAY_AREA_HEIGHT - SPRITE_COLLISION_HEIGHT / 2;
