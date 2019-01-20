import * as PIXI from "pixi.js";
import { GoodTank, EvilTank } from "./GameObjects/tank.js"
import { handleKeyDown, handleKeyUp } from "./Functions/userinput.js"
import Bullet from "./GameObjects/bullet.js"

export default class Game {
  constructor(element) {
    this._element = element;
    this.updatable = [];
    this.userPlayer = null;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true }, false);
    this._element.appendChild(this.renderer.view);
    this._lastFrameTime = 0;
    this.bindInput();
    requestAnimationFrame(this._tick.bind(this));
  }
  _tick(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    this.updatable.forEach((bullet) => {
      bullet._update(msSinceLastFrame, currentTime);
    });
    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this._tick.bind(this));
  }
  addPlayer() {
    var x = this.renderer.width * (0.1 + Math.random() * 0.8);
    var y = this.renderer.height - (35 + 250);
    this.userPlayer = new GoodTank(this.stage, x, y);
    this.bindShot(this.userPlayer);
    this.updatable.push(this.userPlayer);
  }
  bindShot(tank) {
    tank.on("shoot", (container) => {
      this.shoot(container);
    });
  }
  shoot(origin) {
    const bullet = new Bullet(this.stage, origin.x, origin.y, origin.rotation);
    this.updatable.push(bullet);
    bullet.on('die', () => {
      const index = this.updatable.indexOf(bullet)
      this.updatable.splice(index, 1)
    });
  }
  bindInput() {
    this._element.addEventListener('keydown', (e) => {handleKeyDown(e, this.userPlayer)});
    this._element.addEventListener('keyup', (e) => {handleKeyUp(e, this.userPlayer)});
  }
}