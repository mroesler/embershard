import { Scene, Vector } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { CAMERA_ZOOM, CAMERA_INITIAL_X, CAMERA_INITIAL_Y } from '@/maps/constants/TileConfig';
import { PlayerStats } from '@/player/models/PlayerStats';
import { DEFAULT_MAX_HEALTH, DEFAULT_MAX_MANA } from '@/player/constants/PlayerDefaults';
import { PlayerActor } from '@/player/ui/PlayerActor';
import { HudService } from '@/hud/services/HudService';

export class OverworldScene extends Scene {
  private readonly playerStats: PlayerStats;
  private readonly playerActor: PlayerActor;
  private readonly hudService: HudService;

  constructor(private readonly tiledMap: TiledResource) {
    super();
    this.playerStats = new PlayerStats(DEFAULT_MAX_HEALTH, DEFAULT_MAX_MANA);
    this.playerActor = new PlayerActor(this.playerStats);
    this.hudService = new HudService();
  }

  onInitialize(): void {
    this.camera.zoom = CAMERA_ZOOM;
    this.camera.pos = new Vector(CAMERA_INITIAL_X, CAMERA_INITIAL_Y);
    this.tiledMap.addToScene(this);
    this.hudService.initialize(this, this.playerStats);
    this.add(this.playerActor);
  }
}
