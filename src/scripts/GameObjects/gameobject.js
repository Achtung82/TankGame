import {utils} from "pixi.js";
export default class GameObject extends utils.EventEmitter {
  constructor() {
    super();
    this._id = '_' + Math.random().toString(36).substr(2, 9);
  }
}