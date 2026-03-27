import {
  ScreenElement,
  Rectangle,
  Color,
  Vector,
  Engine,
  Text,
  Font,
  FontUnit,
  TextAlign,
  BaseAlign,
} from 'excalibur';
import type { StatsSnapshot } from '@/hud/interfaces/StatsSnapshot';
import { CANVAS_WIDTH, HUD_TOP_HEIGHT } from '@/maps/constants/TileConfig';

// All dimensions are proportional to HUD_TOP_HEIGHT / CANVAS_WIDTH so they
// remain correct at any CAMERA_ZOOM without importing the zoom constant.
const BAR_WIDTH = Math.round(CANVAS_WIDTH * 0.3); // 461px @ 3×
const BAR_HEIGHT = Math.round(HUD_TOP_HEIGHT * 0.75); // 72px  @ 3×
const BAR_Y = Math.round(HUD_TOP_HEIGHT * 0.125); // 12px  @ 3×
const BAR_GAP = Math.round(CANVAS_WIDTH * 0.015625); // 24px  @ 3×
const FILL_INSET = Math.round(HUD_TOP_HEIGHT * 0.09375); // 9px   @ 3×
const FILL_HEIGHT = BAR_HEIGHT - FILL_INSET * 2;
const FONT_SIZE = Math.round(HUD_TOP_HEIGHT * 0.3125); // 30px  @ 3×

const LABEL_FONT = new Font({
  size: FONT_SIZE,
  unit: FontUnit.Px,
  color: Color.White,
  textAlign: TextAlign.Center,
  baseAlign: BaseAlign.Middle,
  smoothing: false,
});

export class TopHudElement extends ScreenElement {
  private currentStats: StatsSnapshot;
  private healthFill!: ScreenElement;
  private manaFill!: ScreenElement;
  private healthText!: ScreenElement;
  private manaText!: ScreenElement;

  constructor(initialStats: StatsSnapshot) {
    super({ pos: new Vector(0, 0) });
    this.currentStats = initialStats;
  }

  override onInitialize(engine: Engine): void {
    this.graphics.use(
      new Rectangle({
        width: CANVAS_WIDTH,
        height: HUD_TOP_HEIGHT,
        color: Color.fromHex('#111111'),
      })
    );

    const scene = engine.currentScene;

    const healthBg = new ScreenElement({ pos: new Vector(0, BAR_Y) });
    healthBg.graphics.use(
      new Rectangle({
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
        color: new Color(10, 10, 15, 184 / 255),
      })
    );
    scene.add(healthBg);

    const manaBg = new ScreenElement({ pos: new Vector(BAR_WIDTH + BAR_GAP, BAR_Y) });
    manaBg.graphics.use(
      new Rectangle({
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
        color: new Color(10, 10, 15, 184 / 255),
      })
    );
    scene.add(manaBg);

    this.healthFill = new ScreenElement({ pos: new Vector(FILL_INSET, BAR_Y + FILL_INSET) });
    scene.add(this.healthFill);

    this.manaFill = new ScreenElement({
      pos: new Vector(BAR_WIDTH + BAR_GAP + FILL_INSET, BAR_Y + FILL_INSET),
    });
    scene.add(this.manaFill);

    this.healthText = new ScreenElement({
      pos: new Vector(Math.round(BAR_WIDTH / 2), BAR_Y + Math.round(BAR_HEIGHT / 2)),
    });
    scene.add(this.healthText);

    this.manaText = new ScreenElement({
      pos: new Vector(
        BAR_WIDTH + BAR_GAP + Math.round(BAR_WIDTH / 2),
        BAR_Y + Math.round(BAR_HEIGHT / 2)
      ),
    });
    scene.add(this.manaText);

    this.applyFills();
  }

  updateStats(stats: StatsSnapshot): void {
    this.currentStats = stats;
    this.applyFills();
  }

  private applyFills(): void {
    if (!this.healthFill || !this.manaFill) return;
    const { currentHealth, maxHealth, currentMana, maxMana } = this.currentStats;
    const maxFillWidth = BAR_WIDTH - FILL_INSET * 2;

    const healthWidth = Math.max(1, Math.round(maxFillWidth * (currentHealth / maxHealth)));
    const manaWidth = Math.max(1, Math.round(maxFillWidth * (currentMana / maxMana)));

    this.healthFill.graphics.use(
      new Rectangle({
        width: healthWidth,
        height: FILL_HEIGHT,
        color: new Color(200, 35, 35, 235 / 255),
      })
    );
    this.manaFill.graphics.use(
      new Rectangle({
        width: manaWidth,
        height: FILL_HEIGHT,
        color: new Color(30, 80, 210, 235 / 255),
      })
    );

    this.healthText.graphics.use(
      new Text({ text: `${currentHealth}/${maxHealth}`, font: LABEL_FONT })
    );
    this.manaText.graphics.use(new Text({ text: `${currentMana}/${maxMana}`, font: LABEL_FONT }));
  }
}
