/** Width of each walk animation frame in pixels (1 tile wide) */
export const WALK_FRAME_WIDTH = 16;
/** Height of each walk animation frame in pixels (2 tiles tall) */
export const WALK_FRAME_HEIGHT = 32;
/** Number of frames per walk direction */
export const WALK_FRAME_COUNT = 4;
/** Duration of each walk frame in milliseconds */
export const WALK_FRAME_DURATION_MS = 150;

/** Width of each attack animation frame in pixels (2 tiles wide) */
export const ATTACK_FRAME_WIDTH = 32;
/** Height of each attack animation frame in pixels (2 tiles tall) */
export const ATTACK_FRAME_HEIGHT = 32;
/** Number of frames per attack direction */
export const ATTACK_FRAME_COUNT = 4;
/** Duration of each attack frame in milliseconds */
export const ATTACK_FRAME_DURATION_MS = 100;

/** Y pixel offset (0-indexed) for walk-down row in the sprite sheet */
export const WALK_DOWN_Y = 0;
/** Y pixel offset for walk-right row */
export const WALK_RIGHT_Y = 32;
/** Y pixel offset for walk-up row */
export const WALK_UP_Y = 64;
/** Y pixel offset for walk-left row */
export const WALK_LEFT_Y = 96;

/** Y pixel offset for attack-down row */
export const ATTACK_DOWN_Y = 128;
/** Y pixel offset for attack-up row */
export const ATTACK_UP_Y = 160;
/** Y pixel offset for attack-right row */
export const ATTACK_RIGHT_Y = 192;
/** Y pixel offset for attack-left row */
export const ATTACK_LEFT_Y = 224;

/** Total sheet columns when sliced at WALK_FRAME_WIDTH (272 / 16 = 17) */
export const WALK_SHEET_COLUMNS = 17;
/** Total sheet rows when sliced at WALK_FRAME_HEIGHT (256 / 32 = 8) */
export const WALK_SHEET_ROWS = 8;
