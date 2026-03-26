import { playerEventBus } from '@/player/events/PlayerEventBus';
import type { StatsSnapshot } from '@/hud/interfaces/StatsSnapshot';

export class HudService {
  private readonly healthFill: HTMLElement;
  private readonly manaFill: HTMLElement;
  private readonly healthLabel: HTMLElement;
  private readonly manaLabel: HTMLElement;

  constructor() {
    this.healthFill = this.requireElement('health-fill');
    this.manaFill = this.requireElement('mana-fill');
    this.healthLabel = this.requireElement('health-label');
    this.manaLabel = this.requireElement('mana-label');
  }

  initialize(initialStats: StatsSnapshot): void {
    this.renderStats(initialStats);
    playerEventBus.on('statsChanged', ({ stats }) => {
      this.renderStats(stats);
    });
  }

  private renderStats(stats: StatsSnapshot): void {
    const healthPercent = (stats.currentHealth / stats.maxHealth) * 100;
    const manaPercent = (stats.currentMana / stats.maxMana) * 100;
    this.healthFill.style.width = `${healthPercent}%`;
    this.manaFill.style.width = `${manaPercent}%`;
    this.healthLabel.textContent = `${stats.currentHealth}/${stats.maxHealth}`;
    this.manaLabel.textContent = `${stats.currentMana}/${stats.maxMana}`;
  }

  private requireElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) throw new Error(`HUD element not found: #${id}`);
    return element;
  }
}
