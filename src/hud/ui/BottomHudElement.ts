import { ScreenElement, Rectangle, Color, Vector } from 'excalibur';
import {
  CANVAS_WIDTH,
  HUD_TOP_HEIGHT,
  GAME_AREA_HEIGHT,
  HUD_BOTTOM_HEIGHT,
} from '@/maps/constants/TileConfig';

export class BottomHudElement extends ScreenElement {
  constructor() {
    super({
      pos: new Vector(0, HUD_TOP_HEIGHT + GAME_AREA_HEIGHT),
    });
  }

  override onInitialize(): void {
    this.graphics.use(
      new Rectangle({ width: CANVAS_WIDTH, height: HUD_BOTTOM_HEIGHT, color: Color.Black })
    );
  }
}
