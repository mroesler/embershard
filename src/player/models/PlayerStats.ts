export class PlayerStats {
  currentHealth: number;
  readonly maxHealth: number;
  currentMana: number;
  readonly maxMana: number;

  constructor(maxHealth: number, maxMana: number) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.maxMana = maxMana;
    this.currentMana = maxMana;
  }
}
