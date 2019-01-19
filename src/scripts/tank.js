import * as PIXI from "pixi.js";

const ACCELERATION = .005;
const TURNACCELERATION = .1;
const MAX_SPEED = 7;
const MAX_BACK_SPEED = -2;

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
    this._accelerate = false;
    this._deaccelerate = false;
    this._break = false;

    this._game.on('update', this._update.bind(this));
  }
  _update(msSinceLastFrame, currentTime) {
    if(!this.movementCalculation(msSinceLastFrame)) {
      return;
    }
    const newXValue = this._container.position.x + Math.sin( this._container.rotation )  * this._speed;
    const newYValue = this._container.position.y - Math.cos( this._container.rotation )  * this._speed;

    if(!this.edgeCollission(newXValue,newYValue)) {
      return;
    }

    this._container.position.x = newXValue;
		this._container.position.y = newYValue;
  }
  movementCalculation(msSinceLastFrame) {
    if(this._break) {
      return false;
    }

    if(this._turnLeft) {
      this._container.rotation -= TURNACCELERATION;
    }

    if(this._turnRight) {
      this._container.rotation += TURNACCELERATION;
    }
    if(this._accelerate) {
      this._speed += ( msSinceLastFrame * ACCELERATION );
    }
    if(this._deaccelerate) {
      this._speed -= ( msSinceLastFrame * ACCELERATION );
    }

    if( this._speed < MAX_BACK_SPEED ) {
			this._speed = MAX_BACK_SPEED;
    }
    
    if( this._speed > MAX_SPEED ) {
			this._speed = MAX_SPEED;
    }
    return true;
  }
  edgeCollission(newXValue, newYValue) {
    if(newYValue < this._container.height / 2) {
      this._speed = 0;
      return false;
    }

    if(newXValue < this._container.width / 2) {
      this._speed = 0;
      return false;
    }

    if(newYValue > window.innerHeight - (this._container.height / 2)) {
      this._speed = 0;
      return false;
    }

    if(newXValue > window.innerWidth - (this._container.width / 2)) {
      this._speed = 0;
      return false;
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
  accelerate(value) {
    this._accelerate = value;
  }
  deaccelerate(value) {
    this._deaccelerate = value;
  }
}