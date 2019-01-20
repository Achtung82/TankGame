import * as PIXI from "pixi.js";
export default class GameObject extends PIXI.utils.EventEmitter {
  constructor() {
    super();
    this._id = '_' + Math.random().toString(36).substr(2, 9);
  }
}