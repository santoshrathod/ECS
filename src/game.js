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


export class Game {
  constructor(app) {
    this.app = app;
    this.entityManager = new EntityManager();
    this.movementSystem = new MovementSystem();
    this.renderSystem = new RenderSystem(app);
     this.aiSystem = new AISystem();
    this.lastTime = performance.now();
  }

  start() {
    this.spawnUnit();
    this.app.ticker.add(this.gameLoop.bind(this));
  }

  spawnUnit() {
    const id = this.entityManager.createEntity();
    this.entityManager.addComponent(id, new Position(100, 100));
    this.entityManager.addComponent(id, new Velocity(50, 0));
    this.entityManager.addComponent(id, new Health(100));
    this.entityManager.addComponent(id, new Team('blue'));
    this.entityManager.addComponent(id, new Sprite(PIXI.Texture.WHITE));
    this.entityManager.addComponent(id, new Collider(32, 32));
  }

  gameLoop(deltaTime) {
    const delta = deltaTime / 60;
    this.movementSystem.update(this.entityManager, delta);
    this.renderSystem.update(this.entityManager);
  }
}