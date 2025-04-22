
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
export class MovementSystem {
  update(entityManager, delta) {
    const entities = entityManager.getEntitiesWith(Position, Velocity);
    for (const id of entities) {
      const pos = entityManager.getComponent(id, Position);
      const vel = entityManager.getComponent(id, Velocity);
      pos.x += vel.dx * delta;
      pos.y += vel.dy * delta;
    }
  }
}