import type { PlayerStats } from '@/player/models/PlayerStats';

export interface PlayerStatsChangedEvent {
  readonly stats: PlayerStats;
}
