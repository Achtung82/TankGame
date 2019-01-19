import * as PIXI from "pixi.js";

const ACCELERATION = .001;
const TURNACCELERATION = .1;
const MAX_SPEED = 15;

export default class Tank {
  constructor(game, x, y) {
    this._game = game;

    this._container = new PIXI.Container();
		this._container.position.x = x;
    this._container.position.y = y;

    this._body = PIXI.Sprite.fromImage("../assets/tankBlue.png");
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
    this._container.addChild( this._body );

    this._game.stage.addChild(this._container);

    this._speed = 0;
    this._turnLeft = false;
    this._turnRight = false;
    this._break = false;

    this._game.on('update', this._update.bind(this));
  }
  _update(msSinceLastFrame, currentTime) {

    if(this._break) {
      return;
    }

    if(this._turnLeft) {
      this._container.rotation -= TURNACCELERATION;
    }

    if(this._turnRight) {
      this._container.rotation += TURNACCELERATION;
    }

    this._speed += ( msSinceLastFrame * ACCELERATION );

    if( this._speed < 0 ) {
			this._speed = 0;
    }
    
    if( this._speed > MAX_SPEED ) {
			this._speed = MAX_SPEED;
    }
    if(this._container.position.y < 35) {
      return;
    }

    this._container.position.x += Math.sin( this._container.rotation )  * this._speed;
		this._container.position.y -= Math.cos( this._container.rotation )  * this._speed;
  }
  turnLeft() {
    this._turnLeft = true;
  }
  turnRight() {
    this._turnRight = true;
  }
  stopTurn() {
    this._turnRight = false;
    this._turnLeft = false;
  }
  break() {
    this._break = true;
    this._speed = 0;
  }
  stopBreak() {
    this._break = false;
  }
}