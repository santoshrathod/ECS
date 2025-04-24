# ECS
Entity-Component-System

Installation

> npm install

Run the game
> npm run dev

Functionality
1. Add dumy player as sprite reactangle
2. Moving to entire game.
3. Space bar to shoot bullet



## Folder Structure

```
ECS/
├── src/
│   ├── components/
│   │   ├── PlayerComponent.js
│   │   ├── BulletComponent.js
│   │   └── EnemyComponent.js
│   ├── systems/
│   │   ├── MovementSystem.js
│   │   ├── CollisionSystem.js
│   │   └── RenderingSystem.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Bullet.js
│   │   └── Enemy.js
│   ├── assets/
│   │   ├── images/
│   │   │   ├── player.png
│   │   │   ├── bullet.png
│   │   │   └── enemy.png
│   │   └── sounds/
│   │       ├── shoot.wav
│   │       └── explosion.wav
│   └── index.js
├── public/
│   ├── index.html
│   └── styles.css
├── package.json
├── README.md
└── .gitignore
```

```
ECS/
├── src/
│   ├── components/
│   ├── systems/
│   ├── entities/
│   ├── assets/
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```
