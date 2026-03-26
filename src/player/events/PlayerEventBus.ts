import { EventEmitter } from 'excalibur';
import type { PlayerStatsChangedEvent } from '@/player/interfaces/PlayerStatsChangedEvent';

export interface PlayerEventMap {
  statsChanged: PlayerStatsChangedEvent;
}

export const playerEventBus = new EventEmitter<PlayerEventMap>();
