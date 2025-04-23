// AISystem.js
import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { Health } from '../components/Health.js';
export class AISystem {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.randomDirections = new Map(); // entityId -> { dx, dy, nextChange }
  }

  update(entityManager, delta) {
    const now = performance.now();
    const units = entityManager.getEntitiesWith(Position, Velocity, Health);

    for (const id of units) {
      const pos = entityManager.getComponent(id, Position);
      const vel = entityManager.getComponent(id, Velocity);
      const health = entityManager.getComponent(id, Health);

      if (!this.randomDirections.has(id)) {
        this.randomDirections.set(id, this.generateNewDirection(now));
      }

      let dir = this.randomDirections.get(id);

      if (now > dir.nextChange) {
        dir = this.generateNewDirection(now);
        this.randomDirections.set(id, dir);
      }

      if (health.value < 30) {
        vel.dx = -50;
        vel.dy = 0;
      } else {
        // Check bounds — reverse direction if hitting edge
        if ((pos.x < 0 && dir.dx < 0) || (pos.x > this.stageWidth && dir.dx > 0)) {
          dir.dx *= -1;
          dir.nextChange = now + 2000;
        }
        if ((pos.y < 0 && dir.dy < 0) || (pos.y > this.stageHeight && dir.dy > 0)) {
          dir.dy *= -1;
          dir.nextChange = now + 2000;
        }

        vel.dx = dir.dx;
        vel.dy = dir.dy;
      }
    }
  }

  generateNewDirection(currentTime) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = 50;
    return {
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      nextChange: currentTime + 2000 + Math.random() * 2000,
    };
  }
}
