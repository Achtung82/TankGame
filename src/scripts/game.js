import * as PIXI from "pixi.js";
import Tank from "./GameObjects/tank.js"
import Bullet from "./GameObjects/bullet.js"

export default class Game {
  constructor(element) {
    this._element = element;
    this.bullets = [];
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
    this.userPlayer._update(msSinceLastFrame, currentTime);
    this.bullets.forEach((bullet) => {
      bullet._update(msSinceLastFrame, currentTime);
    });
    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this._tick.bind(this));
  }
  addPlayer() {
    var x = this.renderer.width * (0.1 + Math.random() * 0.8);
    var y = this.renderer.height - 35;
    this.userPlayer = new Tank(this, x, y);
  }
  shoot(origin) {
    const bullet = new Bullet(this, origin.x, origin.y, origin.rotation);
    this.bullets.push(bullet);
    bullet.on('die', () => {
      const index = this.bullets.indexOf(bullet)
      this.bullets.splice(index, 1)
    });
  }
  bindInput() {
    var self = this;

    const handleKeyDown = (evt) => {
      switch (evt.keyCode) {
        case 17:
          self.userPlayer.break(true);
          return;
        case 37:
          self.userPlayer.turnLeft(true);
          return;
        case 38:
          self.userPlayer.accelerate(true);
          return;
        case 39:
          self.userPlayer.turnRight(true);
          return;
        case 40:
          self.userPlayer.deaccelerate(true);
          return;
        case 32:
          self.userPlayer.shoot();
          return;
      }
    }
    const handleKeyUp = (evt) => {
      switch (evt.keyCode) {
        case 17:
          self.userPlayer.break(false);
          return;
        case 38:
          self.userPlayer.accelerate(false);
          return;
        case 37:
        case 39:
          self.userPlayer.turnLeft(false);
          self.userPlayer.turnRight(false);
          return;
        case 40:
          self.userPlayer.deaccelerate(false);
          return;
      }
    }
    this._element.addEventListener('keydown', handleKeyDown);
    this._element.addEventListener('keyup', handleKeyUp);
  }
}