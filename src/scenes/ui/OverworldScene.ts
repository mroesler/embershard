import { Scene } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { CAMERA_ZOOM } from '@/maps/constants/TileConfig';

export class OverworldScene extends Scene {
  constructor(private readonly map: TiledResource) {
    super();
  }

  onInitialize(): void {
    this.camera.zoom = CAMERA_ZOOM;
    this.map.addToScene(this);
  }
}
