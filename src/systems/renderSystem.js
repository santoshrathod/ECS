import { Position } from "../components/position";
import { Sprite } from "../components/sprite";
export class RenderSystem {
  constructor(app) {
    this.app = app;
    this.sprites = new Map();
  }

  update(entityManager) {
    const entities = entityManager.getEntitiesWith(Position, Sprite);
    for (const id of entities) {
      const pos = entityManager.getComponent(id, Position);
      const spriteComp = entityManager.getComponent(id, Sprite);

      if (!spriteComp.sprite) {
        const sprite = PIXI.Sprite.from(spriteComp.texture);
        sprite.anchor.set(spriteComp.anchorX, spriteComp.anchorY);
        this.app.stage.addChild(sprite);
        spriteComp.sprite = sprite;
        this.sprites.set(id, sprite);
      }

      const sprite = spriteComp.sprite;
      sprite.x = pos.x;
      sprite.y = pos.y;
    }
  }
}
