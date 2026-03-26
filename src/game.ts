import { Engine, DisplayMode, Color } from 'excalibur';

export const game = new Engine({
  canvasElementId: 'game',
  width: 256,
  height: 240,
  displayMode: DisplayMode.Fixed,
  backgroundColor: Color.Black,
  pixelArt: true,
});
