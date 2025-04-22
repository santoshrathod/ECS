// AISystem.js
import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { Health } from '../components/Health.js';

export class AISystem {
  update(entityManager, delta) {
    const units = entityManager.getEntitiesWith(Position, Velocity, Health);
    for (const id of units) {
      const pos = entityManager.getComponent(id, Position);
      const vel = entityManager.getComponent(id, Velocity);
      const health = entityManager.getComponent(id, Health);

      if (health.value < 30) {
        // Retreat if low on HP
        vel.dx = -50;
        vel.dy = 0;
      } else {
        // Simple patrol logic
        vel.dx = Math.sin(performance.now() / 1000) * 50;
        vel.dy = 0;
      }
    }
  }
}