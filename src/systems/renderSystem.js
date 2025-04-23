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
        const sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        sprite.anchor.set(spriteComp.anchorX, spriteComp.anchorY);

        spriteComp.sprite = sprite;
        this.sprites.set(id, sprite);
      } else {
        const sprite = spriteComp.sprite;
        if (!this.app.stage.children.length) {
          this.app.stage.addChild(sprite);
        }
        sprite.x = pos.x;
        sprite.y = pos.y;
        sprite.height = 32;
        sprite.width = 32;
        sprite.tint = 0x03da00
      }


    }
  }
}
