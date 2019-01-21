import {Container, Sprite, Texture} from "pixi.js";
import GameObject from "./gameobject.js"

const oilTex = Texture.from(require('../../assets/oil.png'));

export class Oil extends GameObject {
  constructor(game, x, y) {
    super();
    this._game = game;
    this._container = new Container();
    this._container.position.x = x;
    this._container.position.y = y;
    this.oilSprite = new Sprite(oilTex);
    this.oilSprite.anchor.x = 0.5;
    this.oilSprite.anchor.y = 0.5;
    this._container.addChild(this.oilSprite);
    this._game.stage.addChild(this._container);
  }
  destroy() {
    this._container.destroy();
  }
}