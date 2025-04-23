
import { Application } from 'pixi.js';
import { Game } from './src/game.js';



async function init() {
    const app = new Application();
    await app.init({
        resizeTo: window,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        antialias: true,
    })

    window.globalThis.__PIXI_APP__ = app;

    // PixiJS v8: Use app.canvas, not app.view
    document.body.appendChild(app.canvas);
    const game = new Game(app);
    game.start();
}

init();





