
export class Sprite {
  constructor(texture, anchorX = 0, anchorY = 0) {
    this.texture = texture;
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.sprite = null;
  }
}