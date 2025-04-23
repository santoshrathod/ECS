export class Shooter {
  constructor(rate = 500) {
    this.lastShotTime = 0;
    this.rate = rate; // ms between shots
  }
}