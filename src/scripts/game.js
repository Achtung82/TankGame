import * as PIXI from "pixi.js";
import Tank from "./tank.js"

export default class Game {
  constructor(element) {
    this._element = element;
    this.tanks = [];
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {transparent: true}, false );
    this._element.appendChild( this.renderer.view );
    this._lastFrameTime = 0;
    requestAnimationFrame(this._tick.bind(this));
  }
  _tick(currentTime) {
    // this.emit( 'update', currentTime - this._lastFrameTime, currentTime );
		this._lastFrameTime = currentTime;
		this.renderer.render( this.stage );
		requestAnimationFrame( this._tick.bind( this ) );
  }
  addPlayer( ) {
		var x = this.renderer.width * ( 0.1 + Math.random() * 0.8 );
		var y = this.renderer.height * ( 0.1 + Math.random() * 0.8 );
		this.tanks.push( new Tank( this, x, y ) );
	}
}