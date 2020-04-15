import Keyboard, { KeyCode } from './Keyboard';
import { COLUMN_COUNTS, ROW_COUNTS, BLOCK_SIZE } from './constants';

class Canvas{
  private ctx: CanvasRenderingContext2D;
  constructor($canvas: HTMLCanvasElement) {
    const ctx = <CanvasRenderingContext2D>$canvas.getContext('2d')
    ctx.canvas.width = COLUMN_COUNTS * BLOCK_SIZE;
    ctx.canvas.height = ROW_COUNTS * BLOCK_SIZE;
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.ctx = ctx;
  }
  clear() {
    this.ctx.clearRect(0, 0, $gameCanvas.width, $gameCanvas.height)
  }
  drawBlock(block: number[][], offset: { x: number, y: number }) {
    block.forEach((row, y) => {
      row.forEach((v, x) => {
        if(v !== 0) {
          this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      })
    })
  }
  drawArena(arena: number[][]) {
    arena.forEach((row, y) => {
      row.forEach((v, x) => {
        if(v !== 0) {
          this.ctx.fillRect(x, y, 1, 1);
        }
      })
    })
  }
}

class Game {
  private lastTime = 0;
  private dropInterval = 1000;
  private dropCounter = 0;
  private canvas: Canvas;
  private playerPos = {
    x: 0,
    y: 0,
  }
  private block = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
  private arena: number[][];
  constructor(canvas: Canvas, keyboard: Keyboard) {
    this.canvas = canvas;
    this.arena = [...new Array(ROW_COUNTS)].map(() => new Array(COLUMN_COUNTS).fill(0))
    keyboard.on(KeyCode.DOWN, () => {
      this.toDownPlayerPos()
    })
    keyboard.on(KeyCode.LEFT, () => {
      this.toLeftPlayerPos()
      console.log(this.playerPos)
    })
    keyboard.on(KeyCode.RIGHT, () => {
      this.toRightPlayerPos()
    })    
    keyboard.on(KeyCode.UP, () => {
      this.rotate()
    })    
    this.update();
  }
  toRightPlayerPos() {
    this.playerPos = {
      ...this.playerPos,
      x: this.playerPos.x + 1
    }
  }
  toLeftPlayerPos() {
    this.playerPos = {
      ...this.playerPos,
      x: this.playerPos.x - 1
    }
  }
  resetPlayerPos() {
    this.playerPos = {
      x: 0,
      y: 0,
    }
  }
  sweepArena() {
    const { arena } = this
    out: for(let y = arena.length - 1; y > 0; y--) {
      for(let x = 0; x < arena[y].length; x++) {
        if(arena[y][x] === 0) {
          continue out;
        }
      }
      arena.pop()
      arena.unshift(new Array(COLUMN_COUNTS).fill(0))
      y++;
    }
  }
  resetBlock() {
    const pieces = 'ILJOTSZ';
    this.block = this.createBlock(pieces[Math.floor(pieces.length * Math.random())])
  }
  toDownPlayerPos() {
    const nextPlayerPos = {
      ...this.playerPos,
      y: this.playerPos.y + 1
    }
    if(this.collide(nextPlayerPos)) {
      this.merge();
      this.sweepArena();
      this.resetBlock();
      this.resetPlayerPos();
    } else {
      this.playerPos = nextPlayerPos;
    }
  }
  rotate() {
    const { block } = this;
    let result = [];
    for(let i = 0; i < block[0].length; i++) {
        let row = block.map(e => e[i]).reverse();
        result.push(row);
    }
    this.block = result;
  }
  merge() {
    const { block, arena, playerPos } = this;
    block.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v !== 0) {
          arena[y + playerPos.y][x + playerPos.x] = v;
        }
      })
    })
  }
  collide(playerPos: {
    x: number,
    y: number,
  }) {
    const { block, arena } = this
    for(let y = 0; y < block.length; y++) {
      for(let x = 0; x < block[y].length; x++) {
        if(
          block[y][x] !== 0 &&
          (
            ( arena[y + playerPos.y] && arena[y + playerPos.y][x + playerPos.x] !== 0 ) || 
            y + playerPos.y === 20
          )
        ){
          return true;
        }
      }
    }
    return false;
  }
  update(time = 0) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;
    if(this.dropCounter > this.dropInterval ){
      this.toDownPlayerPos();
      this.dropCounter = 0;
    }

    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }
  draw() {
    this.canvas.clear();
    this.canvas.drawBlock(this.block, this.playerPos);
    this.canvas.drawArena(this.arena);
  }
  createBlock(shape: string) {
    switch(shape) {
      case 'T':
        return [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ]
      case 'O':
        return [
          [1, 1],
          [1, 1],
        ]
      case 'L':
        return [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1],
        ]
      case 'J':
        return [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
        ]    
      case 'I':
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ]        
      case 'S':
        return [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ]     
      case 'Z':
        return [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ]                 
      default:
        throw new Error("invalid block!")        
    }
  }  
}

const $gameCanvas = <HTMLCanvasElement>document.querySelector('#gameCanvas');

const canvas = new Canvas($gameCanvas);
const keyboard = new Keyboard();
new Game(canvas, keyboard);