import { Position } from '../components/position.js';
import { Velocity } from '../components/velocity.js';
import { Shooter } from '../components/shooter.js';
import { Lifespan } from '../components/lifeSpan.js';
import { Damage } from '../components/damage.js';
import { Sprite } from '../components/sprite.js';
export class ShootingSystem {
    constructor(stage, bulletTexture) {
        this.stage = stage;
        this.bulletTexture = bulletTexture;
    }
    shoot(entityManager, shooterId, speed, angleRadians) {
        const pos = entityManager.getComponent(shooterId, Position);
        const shooter = entityManager.getComponent(shooterId, Shooter);
        const now = performance.now();

        if (!pos || !shooter || now - shooter.lastShotTime < shooter.rate) return;

        shooter.lastShotTime = now;

        const dx = Math.cos(angleRadians) * speed;
        const dy = Math.sin(angleRadians) * speed;

        const bulletId = entityManager.createEntity();
        entityManager.addComponent(bulletId, new Position(pos.x, pos.y));
        entityManager.addComponent(bulletId, new Velocity(dx, dy));
        entityManager.addComponent(bulletId, new Lifespan(2));
        entityManager.addComponent(bulletId, new Damage(100));
        // entityManager.addComponent(bulletId, new Sprite(this.bulletTexture));
        const sprite = new PIXI.Sprite(this.bulletTexture);
        sprite.x = pos.x + 200;
        sprite.y = pos.y;
        sprite.anchor.set(0.5);
        this.stage.addChild(sprite);
        entityManager.addComponent(bulletId, sprite);
    }


    update(entityManager, delta) {
        // const now = performance.now();
        // const shooters = entityManager.getEntitiesWith(Position, Velocity, Shooter);

        // for (const id of shooters) {
        //     const pos = entityManager.getComponent(id, Position);
        //     const vel = entityManager.getComponent(id, Velocity);
        //     const shooter = entityManager.getComponent(id, Shooter);

        //     if (now - shooter.lastShotTime > shooter.rate) {
        //         shooter.lastShotTime = now;

        //         const bulletId = entityManager.createEntity();
        //         entityManager.addComponent(bulletId, Position, new Position(pos.x, pos.y));
        //         entityManager.addComponent(bulletId, Velocity, new Velocity(vel.dx * 2, vel.dy * 2));
        //         entityManager.addComponent(bulletId, Lifespan, new Lifespan(2000));
        //         entityManager.addComponent(bulletId, Damage, new Damage(10));

        //         const sprite = new PIXI.Sprite(this.bulletTexture);
        //         sprite.x = pos.x;
        //         sprite.y = pos.y;
        //         sprite.anchor.set(0.5);
        //         this.stage.addChild(sprite);
        //         entityManager.addComponent(bulletId, 'Sprite', sprite);
        //     }
        // }
    }
}


