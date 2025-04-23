// Game.js
import { EntityManager } from './core/entityManager';
import { Position } from './components/position';
import { Velocity } from './components/velocity';
import { Health } from './components/health';
import { Team } from './components/team';
import { Sprite } from './components/sprite';
import { Collider } from './components/collider';
import { MovementSystem } from './systems/movementSystem';
import { RenderSystem } from './systems/renderSystem';
import { AISystem } from './systems/aiSystem.js';
import { ShootingSystem } from './systems/shootingSystem.js';


export class Game {
  constructor(app) {
    this.app = app;
    this.entityManager = new EntityManager();
    this.movementSystem = new MovementSystem();
    this.renderSystem = new RenderSystem(app);
    this.shootingSystem = new ShootingSystem();
     this.aiSystem = new AISystem(app.view.width,app.view.height);
    this.lastTime = performance.now();
  }

  start() {
    this.spawnUnit();
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        const playerId = this.entityManager.getEntitiesWith(Position)[0]; // Get the first entity (the player)
        this.shootingSystem.shoot(this.entityManager, playerId, 300, Math.PI / 4); // Shoot at 45 degrees
      }
    });
    this.app.ticker.add(this.gameLoop.bind(this));
  }

  spawnUnit() {
    const id = this.entityManager.createEntity();
    this.entityManager.addComponent(id, new Position(100, 100));
    this.entityManager.addComponent(id, new Velocity(500, 500));
    this.entityManager.addComponent(id, new Health(100));
    this.entityManager.addComponent(id, new Team('blue'));
    this.entityManager.addComponent(id, new Sprite(PIXI.Texture.WHITE));
    this.entityManager.addComponent(id, new Collider(32, 32));
  }

  gameLoop(timeStamp) {
    const delta = timeStamp.deltaTime / 60;
    this.aiSystem.update(this.entityManager, delta);
    this.movementSystem.update(this.entityManager, delta);
    this.shootingSystem.update(this.entityManager, delta);
    this.renderSystem.update(this.entityManager);
  }
}