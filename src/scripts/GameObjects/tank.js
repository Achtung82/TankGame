import * as PIXI from "pixi.js";
import { edgeCollision, unitCollision } from "../Functions/collision";
import GameObject from "./gameobject.js"

const ACCELERATION = .005;
const TURNACCELERATION = .1;
const MAX_SPEED = 5;
const MAX_BACK_SPEED = -2;

const BLUE_BODY_TEX = PIXI.Texture.fromImage('../assets/tankBlue.png');
const BLUE_BARREL_TEX = PIXI.Texture.fromImage('../assets/barrelBlue.png');
const GREEN_BODY_TEX = PIXI.Texture.fromImage('../assets/tankGreen.png');
const GREEN_BARREL_TEX = PIXI.Texture.fromImage('../assets/barrelGreen.png');


export class Tank extends GameObject {
  constructor(game, x, y, bodyTex, barrelTex) {
    super();
    this._game = game;
    this._container = new PIXI.Container();
    this._container.position.x = x;
    this._container.position.y = y;
    this._container.scale.set(0.5);

    this._body = new PIXI.Sprite(bodyTex);
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
    this._barrel = new PIXI.Sprite(barrelTex);
    this._barrel.anchor.x = 0.5;
    this._barrel.anchor.y = 1;

    this._container.addChild(this._body);
    this._container.addChild(this._barrel);

    this._game.stage.addChild(this._container);

    this._speed = 0;
    this._turnLeft = false;
    this._turnRight = false;
    this._accelerate = false;
    this._deaccelerate = false;
    this._break = false;
    this._shooting = false;
  }

  movementCalculation(msSinceLastFrame) {
    if (this._break) {
      return false;
    }

    if (this._turnLeft) {
      this._container.rotation -= TURNACCELERATION;
    }

    if (this._turnRight) {
      this._container.rotation += TURNACCELERATION;
    }
    if (this._accelerate) {
      this._speed += (msSinceLastFrame * ACCELERATION);
    }
    if (this._deaccelerate) {
      this._speed -= (msSinceLastFrame * ACCELERATION);
    }

    if (this._speed < MAX_BACK_SPEED) {
      this._speed = MAX_BACK_SPEED;
    }
    if (this._speed > MAX_SPEED) {
      this._speed = MAX_SPEED;
    }

    return true;
  }
  turnLeft(value) {
    this._turnLeft = value;
  }
  turnRight(value) {
    this._turnRight = value;
  }
  break(value) {
    this._break = value;
    this._speed = 0;
  }

  shoot() {
    if (this._shooting) {
      return;
    }
    this._barrel
    this._barrel.anchor.y = .5;
    this._shooting = true;
    this.emit("shoot", this);
    setTimeout(() => {
      this._barrel.anchor.y = 1;
      this._shooting = false;
    }, 500);
  }
}

export class EvilTank extends Tank {
  constructor(game, x, y) {
    super(game, x, y, GREEN_BODY_TEX, GREEN_BARREL_TEX);
    this._speed = MAX_SPEED * 0.5 + Math.random() * 0.5 * MAX_SPEED;
  }
  _update(msSinceLastFrame, currentTime) {
    if (!this.movementCalculation(msSinceLastFrame)) {
      return;
    }
    const newXValue = this._container.position.x + Math.sin(this._container.rotation) * this._speed;
    const newYValue = this._container.position.y - Math.cos(this._container.rotation) * this._speed;

    if (edgeCollision(newXValue, newYValue, this._container)) {
      this.die();
      return;
    }
    this._container.position.x = newXValue;
    this._container.position.y = newYValue;
  }
  die() {
    this._container.destroy();
    this.emit("die");
  }
}

export class GoodTank extends Tank {
  constructor(game, x, y) {
    super(game, x, y, BLUE_BODY_TEX, BLUE_BARREL_TEX);

  }
  _update(msSinceLastFrame, currentTime) {
    if (!this.movementCalculation(msSinceLastFrame)) {
      return;
    }
    const newXValue = this._container.position.x + Math.sin(this._container.rotation) * this._speed;
    const newYValue = this._container.position.y - Math.cos(this._container.rotation) * this._speed;

    if (edgeCollision(newXValue, newYValue, this._container)) {
      this._speed = 0;
      return;
    }
    const target = unitCollision(this, this._game.updatable);
    if (target) {
      this.die();
      target.die();
      return;
    }

    this._container.position.x = newXValue;
    this._container.position.y = newYValue;
  }
  die() {
    this._container.destroy();
    this.emit("die");
  }
  accelerate(value) {
    this._accelerate = value;
  }
  deaccelerate(value) {
    this._deaccelerate = value;
  }
}