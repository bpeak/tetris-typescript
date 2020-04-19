export enum KeyCode {
  ESC = 27,
  SPACE = 32,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
}

type listener = () => void;
type deps = {
  [dep: string]: listener[]; 
}

export default class Keyboard {
  private deps: deps;
  constructor() {
    this.deps = {};
    document.addEventListener("keydown", (e:KeyboardEvent) => {
      e.preventDefault();
      this.publish(<KeyCode>e.keyCode)
    })      
  }
  hasOwn(obj: deps, keyCode: KeyCode) {
    return Object.prototype.hasOwnProperty.call(obj, keyCode);
  }
  on(keyCode: KeyCode, listener: listener) {
    if(!this.hasOwn(this.deps, keyCode)) { this.deps[keyCode] = [] };

    this.deps[keyCode].push(listener);
  }
  publish(keyCode: KeyCode) {
    if(!this.hasOwn(this.deps, keyCode)) { return }

    this.deps[keyCode].forEach(listener => listener())
  }
}