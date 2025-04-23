export class Projectile {
  constructor(damage = 10, speed = 10, direction = 0) {
    this.damage = damage;
    this.speed = speed;
    this.direction = direction; // in radians
    this.active = true; // to track if the projectile is still alive
  }
}