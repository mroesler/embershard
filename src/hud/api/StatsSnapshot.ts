/**
 * Read-only view of a character's current HP and MP values.
 * Consumed by HudService to update the DOM bars without depending
 * directly on the PlayerStats model class.
 */
export interface StatsSnapshot {
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly currentMana: number;
  readonly maxMana: number;
}
