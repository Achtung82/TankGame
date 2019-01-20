import * as PIXI from "pixi.js";
import {edgeCollision} from "../Functions/collision";

const SPEED = 12;
const bulletTex = PIXI.Texture.fromImage('../assets/bulletBlue.png');

export default class Bullet extends PIXI.utils.EventEmitter {
  constructor(stage, x, y, rotation) {
    super();

    this._container = new PIXI.Container();
    this._container.position.x = x;
    this._container.position.y = y;
    this._container.scale.set(0.5);
    this._container.rotation = rotation;

    this._bullet = new PIXI.Sprite(bulletTex);
    this._bullet.anchor.x = 0.5;
    this._bullet.anchor.y = 0.5;
    this._container.addChild(this._bullet);

    stage.addChild(this._container);

    this._speed = SPEED;
  }
  _update(msSinceLastFrame, currentTime) {
    const newXValue = this._container.position.x + Math.sin(this._container.rotation) * this._speed;
    const newYValue = this._container.position.y - Math.cos(this._container.rotation) * this._speed;

    if (!edgeCollision(newXValue, newYValue, this._container)) {
      this._container.destroy();
      this.emit("die");
      return;
    }

    this._container.position.x = newXValue;
    this._container.position.y = newYValue;
  }
}