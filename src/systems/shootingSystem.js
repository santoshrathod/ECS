import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { Projectile } from '../components/projectile.js';

export class ShootingSystem {
  constructor() {
    this.projectiles = [];
  }

  shoot(entityManager, entityId, speed, direction) {
    const pos = entityManager.getComponent(entityId, Position);
    const projectile = new Projectile(10, speed, direction);
    const projEntity = entityManager.createEntity();

    entityManager.addComponent(projEntity, new Position(pos.x, pos.y));
    entityManager.addComponent(projEntity, new Velocity(Math.cos(direction) * speed, Math.sin(direction) * speed));
    entityManager.addComponent(projEntity, projectile);
  }

  update(entityManager, delta) {
    const projectiles = entityManager.getEntitiesWith(Position, Velocity, Projectile);

    for (const id of projectiles) {
      const pos = entityManager.getComponent(id, Position);
      const vel = entityManager.getComponent(id, Velocity);

      // Move the projectile
      pos.x += vel.dx * delta;
      pos.y += vel.dy * delta;

      // Check if projectile goes out of bounds
      if (pos.x < 0 || pos.x > 1280 || pos.y < 0 || pos.y > 720) {
        entityManager.removeEntity(id); // Remove projectile
      }
    }
  }
}
