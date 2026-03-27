import { Scene } from 'excalibur';
import { playerEventBus } from '@/player/events/PlayerEventBus';
import type { StatsSnapshot } from '@/hud/interfaces/StatsSnapshot';
import { TopHudElement } from '@/hud/ui/TopHudElement';
import { BottomHudElement } from '@/hud/ui/BottomHudElement';

export class HudService {
  private topHudElement!: TopHudElement;
  private bottomHudElement!: BottomHudElement;

  initialize(scene: Scene, initialStats: StatsSnapshot): void {
    this.topHudElement = new TopHudElement(initialStats);
    this.bottomHudElement = new BottomHudElement();
    scene.add(this.topHudElement);
    scene.add(this.bottomHudElement);
    playerEventBus.on('statsChanged', ({ stats }) => {
      this.topHudElement.updateStats(stats);
    });
  }
}
