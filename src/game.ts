import { Engine, DisplayMode, Color } from 'excalibur';

export const game = new Engine({
  canvasElementId: 'game',
  width: 512,
  height: 256,
  displayMode: DisplayMode.Fixed,
  backgroundColor: Color.Black,
  pixelArt: true,
});
