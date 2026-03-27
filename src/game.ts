import { Engine, DisplayMode, Color } from 'excalibur';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/maps/constants/TileConfig';

export const game = new Engine({
  canvasElementId: 'game',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  displayMode: DisplayMode.Fixed,
  backgroundColor: Color.Black,
  pixelArt: true,
});
