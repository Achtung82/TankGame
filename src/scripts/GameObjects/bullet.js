import * as PIXI from "pixi.js";
import {edgeCollision, unitCollision} from "../Functions/collision";
import GameObject from "./gameobject.js"

const SPEED = 12;
const bulletTex = PIXI.Texture.fromImage('../assets/bulletBlue.png');

export default class Bullet extends GameObject {
  constructor(game, creator) {
    super();
    this._game = game;
    this._creator = creator;
    this._container = new PIXI.Container();
    this._container.position.x = creator._container.x;
    this._container.position.y = creator._container.y;
    this._container.scale.set(0.5);
    this._container.rotation = creator._container.rotation;

    this._bullet = new PIXI.Sprite(bulletTex);
    this._bullet.anchor.x = 0.5;
    this._bullet.anchor.y = 0.5;
    this._container.addChild(this._bullet);

    this._game.stage.addChild(this._container);

    this._speed = SPEED;
  }
  _update(msSinceLastFrame, currentTime) {
    const newXValue = this._container.position.x + Math.sin(this._container.rotation) * this._speed;
    const newYValue = this._container.position.y - Math.cos(this._container.rotation) * this._speed;

    if (edgeCollision(newXValue, newYValue, this._container, this._game.renderer.width, this._game.renderer.height)) {
      this.die();
      return;
    }
    const target = unitCollision(this, this._game.updatable, this._creator);
    if (target) {
      this._creator.addKill();
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
}