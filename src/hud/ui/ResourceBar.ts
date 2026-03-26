import { ScreenElement, Canvas, Vector } from 'excalibur';

export interface ResourceBarConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  maxValue: number;
}

export class ResourceBar extends ScreenElement {
  private currentValue: number;
  private readonly barGraphic: Canvas;

  constructor(private readonly config: ResourceBarConfig) {
    super({
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
    });
    this.anchor = Vector.Zero;
    this.currentValue = config.maxValue;

    this.barGraphic = new Canvas({
      width: config.width,
      height: config.height,
      cache: false,
      draw: (ctx) => this.renderBar(ctx),
    });
  }

  onInitialize(): void {
    this.graphics.use(this.barGraphic);
  }

  setCurrentValue(value: number): void {
    this.currentValue = Math.max(0, Math.min(value, this.config.maxValue));
  }

  getCurrentValue(): number {
    return this.currentValue;
  }

  // coverage: ignore — canvas 2D drawing code; visually verified, no unit-testable assertions
  private renderBar(ctx: CanvasRenderingContext2D): void {
    const { width, height, fillColor, maxValue } = this.config;
    const cornerRadius = Math.floor(height / 2);
    const border = 1;
    const innerX = border;
    const innerY = border;
    const innerWidth = width - border * 2;
    const innerHeight = height - border * 2;
    const innerCornerRadius = Math.max(0, cornerRadius - border);
    const fillRatio = this.currentValue / maxValue;

    ctx.clearRect(0, 0, width, height);

    // Semi-transparent dark background
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, cornerRadius);
    ctx.fillStyle = 'rgba(10, 10, 15, 0.65)';
    ctx.fill();

    // Empty track: soft white for the "lost value" portion
    ctx.beginPath();
    ctx.roundRect(innerX, innerY, innerWidth, innerHeight, innerCornerRadius);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.fill();

    // Filled portion clipped to inner rounded rect
    if (fillRatio > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(innerX, innerY, innerWidth, innerHeight, innerCornerRadius);
      ctx.clip();

      ctx.fillStyle = fillColor;
      ctx.fillRect(innerX, innerY, innerWidth * fillRatio, innerHeight);

      // 3D depth gradient: lighter top edge, darker bottom
      const depthGradient = ctx.createLinearGradient(0, innerY, 0, innerY + innerHeight);
      depthGradient.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
      depthGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
      depthGradient.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
      ctx.fillStyle = depthGradient;
      ctx.fillRect(innerX, innerY, innerWidth * fillRatio, innerHeight);

      ctx.restore();
    }

    // White-grey border
    ctx.beginPath();
    ctx.roundRect(border / 2, border / 2, width - border, height - border, cornerRadius);
    ctx.strokeStyle = 'rgba(210, 210, 220, 0.88)';
    ctx.lineWidth = border;
    ctx.stroke();

    // Centered value text: "80 / 100"
    const fontSize = Math.floor(height * 0.58);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(`${Math.round(this.currentValue)} / ${maxValue}`, width / 2, height / 2);
    ctx.shadowBlur = 0;
  }
}
