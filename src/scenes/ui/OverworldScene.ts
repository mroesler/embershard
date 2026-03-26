import { Scene } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { CAMERA_ZOOM } from '@/maps/constants/TileConfig';
import { ResourceBar } from '@/hud/ui/ResourceBar';
import { PlayerStats } from '@/player/models/PlayerStats';
import { DEFAULT_MAX_HEALTH, DEFAULT_MAX_MANA } from '@/player/constants/PlayerDefaults';

const HEALTH_BAR_FILL_COLOR = 'rgba(210, 30, 30, 0.9)';
const MANA_BAR_FILL_COLOR = 'rgba(30, 80, 200, 0.9)';
const BAR_TOP_MARGIN = 5;
const BAR_LEFT_MARGIN = 6;
const BAR_WIDTH = 110;
const BAR_HEIGHT = 16;
const BAR_GAP = 24;

export class OverworldScene extends Scene {
  readonly healthBar: ResourceBar;
  readonly manaBar: ResourceBar;

  constructor(private readonly tiledMap: TiledResource) {
    super();
    const playerStats = new PlayerStats(DEFAULT_MAX_HEALTH, DEFAULT_MAX_MANA);

    this.healthBar = new ResourceBar({
      x: BAR_LEFT_MARGIN,
      y: BAR_TOP_MARGIN,
      width: BAR_WIDTH,
      height: BAR_HEIGHT,
      fillColor: HEALTH_BAR_FILL_COLOR,
      maxValue: playerStats.maxHealth,
    });

    this.manaBar = new ResourceBar({
      x: BAR_LEFT_MARGIN + BAR_WIDTH + BAR_GAP,
      y: BAR_TOP_MARGIN,
      width: BAR_WIDTH,
      height: BAR_HEIGHT,
      fillColor: MANA_BAR_FILL_COLOR,
      maxValue: playerStats.maxMana,
    });
  }

  onInitialize(): void {
    this.camera.zoom = CAMERA_ZOOM;
    this.tiledMap.addToScene(this);
    this.add(this.healthBar);
    this.add(this.manaBar);
  }
}
