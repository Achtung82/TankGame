import * as PIXI from "pixi.js";
import Tank from "./tank.js"

export default class Game extends PIXI.utils.EventEmitter {
  constructor(element) {
    super();
    this._element = element;
    this.tanks = [];
    this.userPlayer = null;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true }, false);
    this._element.appendChild(this.renderer.view);
    this._lastFrameTime = 0;
    this.bindInput();
    requestAnimationFrame(this._tick.bind(this));
  }
  _tick(currentTime) {
    this.emit('update', currentTime - this._lastFrameTime, currentTime);
    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this._tick.bind(this));
  }
  addPlayer() {
    var x = this.renderer.width * (0.1 + Math.random() * 0.8);
    var y = this.renderer.height;
    this.userPlayer = new Tank(this, x, y);
    this.tanks.push(this.userPlayer);
  }
  bindInput() {
    var self = this;

    const handleKeyDown = (evt) => {
      switch (evt.keyCode) {
        case 37:
          self.userPlayer.turnLeft();
          return;
        case 39:
          self.userPlayer.turnRight();
          return;
        case 32:
          self.userPlayer.break();
          return;
      }
    }
    const handleKeyUp = (evt) => {
      switch (evt.keyCode) {
        case 37:
        case 39:
          self.userPlayer.stopTurn();
          return;
        case 32:
          self.userPlayer.stopBreak();
          return;
      }
    }
    this._element.addEventListener('keydown', handleKeyDown);
    this._element.addEventListener('keyup', handleKeyUp);
  }
}