import { Engine, DisplayMode, Color } from 'excalibur';

const game = new Engine({
  width: 256,
  height: 240,
  displayMode: DisplayMode.FitScreenAndFill,
  backgroundColor: Color.Black,
  pixelArt: true,
});

game.start();
