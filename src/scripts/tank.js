import * as PIXI from "pixi.js";

export default class Tank {
  constructor(game, x, y) {
    this._game = game;
    this._body = PIXI.Sprite.fromImage("../assets/tankBlue.png");
    this._body.position.x = x;
    this._body.position.y = y;
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
    this._game.stage.addChild(this._body);
  }
  _update( msSinceLastFrame, currentTime ) {
    console.log("woop woop");
  }
}