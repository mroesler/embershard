import { Scene } from 'excalibur';
import { CAMERA_ZOOM } from '@/maps/constants/TileConfig';

export class OverworldScene extends Scene {
  onInitialize(): void {
    this.camera.zoom = CAMERA_ZOOM;
  }
}
