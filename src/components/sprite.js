export class Sprite {
  constructor(texture, anchorX = 0.5, anchorY = 0.5) {
    this.texture = texture;
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.sprite = null; // PIXI.Sprite instance created later
  }
}