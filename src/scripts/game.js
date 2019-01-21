import { Container, Text, autoDetectRenderer } from "pixi.js";
import { GoodTank, EvilTank } from "./GameObjects/tank.js"
import Explosion from "./GameObjects/explosion.js"
import { Oil } from "./GameObjects/obstacles.js"
import { handleKeyDown, handleKeyUp } from "./Functions/userinput.js"
import Bullet from "./GameObjects/bullet.js"

export default class Game {
  constructor(element) {
    this._element = element;
    this.updatable = [];
    this.explosions = [];
    this.obstacles = [];
    this.userPlayer = null;
    this.stage = new Container();
    this.renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true }, false);
    this._element.appendChild(this.renderer.view);
    this._lastFrameTime = 0;
    this.bindInput();
    requestAnimationFrame(this.update.bind(this));
    this.initObstacles();
    this.initPlayers();
    this.initScore();
  }
  initObstacles() {
    for (let i = 0; i < 4; i++) {
      this.addObstacle();
    }
  }
  addObstacle() {
    const newX = this.renderer.width * (0.1 + Math.random() * 0.8);
    const newY = this.renderer.width * (0.1 + Math.random() * 0.8);
    const oilObst = new Oil(this, newX, newY);
    this.obstacles.push(oilObst);
  }
  initScore() {
    this._highScore = 0;
    this._scoreDisplay = new Text('Time: 0:00 Kills: 0', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
    this._highScoreDisplay = new Text('Kills: 0', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
    this._highScoreDisplay.position.x = this.renderer.width;
    this._highScoreDisplay.anchor.x = 1;
    this.stage.addChild(this._scoreDisplay);
    this.stage.addChild(this._highScoreDisplay);
  }
  initPlayers() {
    this.addPlayer();
    for (let i = 0; i < 4; i++) {
      this.addEvilTank();
    }
  }
  updateScore() {
    const ms = this.userPlayer._scoreTime;
    const mins = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);
    const score = `Time: ${mins}:${(sec < 10 ? '0' : '') + sec} Kills: ${this.userPlayer._kills}`;
    this._scoreDisplay.text = score;
  }
  update(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    this.updatable.forEach((bullet) => {
      bullet._update(msSinceLastFrame, currentTime);
    });
    this.explosions.forEach((explosion) => {
      explosion._update(msSinceLastFrame, currentTime);
    });
    this.updateScore();
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
    this.userPlayer.on("score", (kills) => {
      if (kills > this._highScore) {
        this._highScore = kills;
        this._highScoreDisplay.text = "Kills: " + kills;
      }
    });
    this.bindExplode(this.userPlayer);
    this.updatable.push(this.userPlayer);
  }
  addEvilTank() {
    setTimeout(() => {
      var x = this.renderer.width * (0.1 + Math.random() * 0.8);
      var y = this.renderer.height - 35;
      const evilAITank = new EvilTank(this, x, y);
      this.bindShot(evilAITank);
      this.bindDie(evilAITank, () => {
        this.addEvilTank();
      });
      this.bindExplode(evilAITank);
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
  bindExplode(tank) {
    tank.on("explode", (container) => {
      const exp = new Explosion(this, container);
      this.explosions.push(exp);
      exp.on("die", () => {
        const index = this.explosions.indexOf(exp);
        this.explosions.splice(index, 1);
      });
    });
  }
  shoot(origin) {
    const bullet = new Bullet(this, origin);
    this.updatable.push(bullet);
    this.bindDie(bullet);
  }
  bindInput() {
    this._element.addEventListener('keydown', (e) => { handleKeyDown(e, this.userPlayer) });
    this._element.addEventListener('keyup', (e) => { handleKeyUp(e, this.userPlayer) });
  }
  bang(container) {
    const explContainer = new Container();
    explContainer.co
    this.stage.addChild(this._bullet);
  }
}