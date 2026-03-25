import { Engine, DisplayMode, Color } from 'excalibur';

export const game = new Engine({
  width: 256,
  height: 240,
  displayMode: DisplayMode.FitScreenAndFill,
  backgroundColor: Color.Black,
  pixelArt: true,
});
