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
    requestAnimationFrame(this.update.bind(this));
    this.initPlayers();
  }
  initPlayers() {
    this.addPlayer();
    this.addEvilTank();
    this.addEvilTank();
  }
  update(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    this.updatable.forEach((bullet) => {
      bullet._update(msSinceLastFrame, currentTime);
    });
    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
  }
  addPlayer() {
    var x = this.renderer.width * (0.1 + Math.random() * 0.8);
    var y = this.renderer.height - (35 + 250);
    this.userPlayer = new GoodTank(this, x, y);
    this.bindShot(this.userPlayer);
    this.bindDie(this.userPlayer, () => {
      this.addPlayer();
    });
    this.updatable.push(this.userPlayer);
  }
  addEvilTank() {
    setTimeout(()=>{
      var x = this.renderer.width * (0.1 + Math.random() * 0.8);
      var y = this.renderer.height - 35;
      const evilAITank = new EvilTank(this, x, y);
      this.bindShot(evilAITank);
      this.bindDie(evilAITank, () => {
        this.addEvilTank();
      });
      this.updatable.push(evilAITank);
    }, Math.random() * 1400);
  }
  bindShot(tank) {
    tank.on("shoot", (container) => {
      this.shoot(container);
    });
  }
  bindDie(unit, afterDie) {
    unit.on("die", () => {
      const index = this.updatable.indexOf(unit);
      this.updatable.splice(index, 1);
      afterDie && afterDie();
    });
  }
  shoot(origin) {
    const bullet = new Bullet(this, origin);
    this.updatable.push(bullet);
    this.bindDie(bullet);
  }
  bindInput() {
    this._element.addEventListener('keydown', (e) => {handleKeyDown(e, this.userPlayer)});
    this._element.addEventListener('keyup', (e) => {handleKeyUp(e, this.userPlayer)});
  }
}