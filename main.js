
import { Application } from 'pixi.js';
import { Game } from './src/game.js';



async function init() {
    const app = new Application();
    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xcccccc,
        antialias: true,
    })

    // PixiJS v8: Use app.canvas, not app.view
    document.body.appendChild(app.canvas);
    const game = new Game(app);
    game.start();
}

init();





