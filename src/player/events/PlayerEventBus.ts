import { EventEmitter } from 'excalibur';
import type { PlayerStatsChangedEvent } from '@/player/events/PlayerStatsChangedEvent';

export interface PlayerEventMap {
  statsChanged: PlayerStatsChangedEvent;
}

export const playerEventBus = new EventEmitter<PlayerEventMap>();
