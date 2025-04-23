import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { Lifespan } from "../components/lifeSpan";
import { Damage } from "../components/damage";
import { Sprite } from "../components/sprite";
import { Health } from "../components/health";
export class BulletSystem {
    update(entityManager, delta) {
        const bullets = entityManager.getEntitiesWith(Lifespan, Damage);
        const targets = entityManager.getEntitiesWith(Position, Health);

        for (const bulletId of bullets) {
            const pos = entityManager.getComponent(bulletId, Position);
            const vel = entityManager.getComponent(bulletId, Velocity);
            const life = entityManager.getComponent(bulletId, Lifespan);
            const damage = entityManager.getComponent(bulletId, Damage);
            const sprite = entityManager.getComponent(bulletId, Sprite);

            pos.x += vel.dx * (delta / 1000);
            pos.y += vel.dy * (delta / 1000);
            life.remaining -= delta;

            if (sprite) {
                sprite.x = pos.x;
                sprite.y = pos.y;
            }

            for (const targetId of targets) {
                if (targetId === bulletId) continue;
                const targetPos = entityManager.getComponent(targetId, Position);
                const targetHealth = entityManager.getComponent(targetId, Health);
                const dx = pos.x - targetPos.x;
                const dy = pos.y - targetPos.y;
                const distSq = dx * dx + dy * dy;

                // if (distSq < 190) { // radius = 20px approx
                //     targetHealth.value -= damage.value;
                //     if (sprite) sprite.destroy();
                //     entityManager.removeEntity(bulletId);
                //     break;
                // }
            }

            if (life.remaining <= 0) {
                if (sprite.sprite) sprite.destroy();
                entityManager.removeEntity(bulletId);
            }
        }
    }
}

export function createBulletTexture(entityManager) {  
       
        const sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        sprite.height = 15;
        sprite.width = 15;
        sprite.tint = 0xf80a06

        return  sprite;
    
}