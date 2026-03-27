export const TILE_SIZE = 16; // px per tile (matches ArMM1998 asset pack)
export const SCREEN_TILES_X = 32; // tiles per screen horizontally
export const SCREEN_TILES_Y = 16; // tiles per screen vertically

/**
 * Engine zoom applied to the camera. All canvas-space constants below are expressed
 * in screen pixels (i.e. already multiplied by CAMERA_ZOOM) so that ScreenElements,
 * font sizes, and bar dimensions stay proportional at any zoom level.
 */
export const CAMERA_ZOOM = 3;

/** Height of the top HUD strip in screen pixels (2 tiles × CAMERA_ZOOM) */
export const HUD_TOP_HEIGHT = TILE_SIZE * 2 * CAMERA_ZOOM; // 96
/** Height of the bottom HUD strip in screen pixels (4 tiles × CAMERA_ZOOM) */
export const HUD_BOTTOM_HEIGHT = TILE_SIZE * 4 * CAMERA_ZOOM; // 192
/** Height of the playable map area in screen pixels */
export const GAME_AREA_HEIGHT = SCREEN_TILES_Y * TILE_SIZE * CAMERA_ZOOM; // 768
/** Total canvas width in screen pixels */
export const CANVAS_WIDTH = SCREEN_TILES_X * TILE_SIZE * CAMERA_ZOOM; // 1536
/** Total canvas height in screen pixels */
export const CANVAS_HEIGHT = HUD_TOP_HEIGHT + GAME_AREA_HEIGHT + HUD_BOTTOM_HEIGHT; // 1056

/**
 * World-space X the camera starts at — the horizontal centre of the tile map.
 * Expressed in world pixels (independent of zoom).
 */
export const CAMERA_INITIAL_X = CANVAS_WIDTH / 2 / CAMERA_ZOOM; // 256

/**
 * World-space Y the camera starts at.
 * Derived so that world y=0 maps to screen y=HUD_TOP_HEIGHT:
 *   screen_y = CANVAS_HEIGHT/2 + (world_y - camera_y) × zoom
 *   HUD_TOP_HEIGHT = CANVAS_HEIGHT/2 − camera_y × zoom
 *   => camera_y = (CANVAS_HEIGHT/2 − HUD_TOP_HEIGHT) / zoom = 144
 */
export const CAMERA_INITIAL_Y = (CANVAS_HEIGHT / 2 - HUD_TOP_HEIGHT) / CAMERA_ZOOM; // 144
