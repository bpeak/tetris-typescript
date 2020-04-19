import Keyboard, { KeyCode } from './Keyboard';
import { COLUMN_COUNTS, ROW_COUNTS, BLOCK_SIZE } from './constants';

const $ = document.querySelector.bind(document);

class Canvas{
  private ctx: CanvasRenderingContext2D;
  private $canvas: HTMLCanvasElement;
  constructor({
    $canvas,
    width,
    height,
    scale,
  }: {
    $canvas: HTMLCanvasElement,
    width: number,
    height: number,
    scale: number,
  }) {
    const ctx = <CanvasRenderingContext2D>$canvas.getContext('2d')
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.scale(scale, scale);
    this.$canvas = $canvas;
    this.ctx = ctx;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
  }
  drawBlock(block: Matrix, offset: Pos) {
    block.forEach((row, y) => {
      row.forEach((v, x) => {
        if(v !== 0) {
          this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      })
    })
  }
  drawArena(arena: Matrix) {
    arena.forEach((row, y) => {
      row.forEach((v, x) => {
        if(v !== 0) {
          this.ctx.fillRect(x, y, 1, 1);
        }
      })
    })
  }
}

class Board {
  private $score: HTMLSpanElement;
  constructor({
    $score,
  }: {
    $score: HTMLSpanElement,
  }) {
    this.$score = $score;
  }
  setScore(score: string | number) {
    this.$score.innerText = String(score);
  }
}

class Game {
  private readonly canvas: Canvas;
  private readonly board: Board;
  private readonly keyboard: Keyboard;

  private readonly dropInterval = 1000;
  private lastTime = 0;
  private dropCounter = 0;

  private readonly blockNames = 'ILJOTSZ';
  private arena: Matrix;
  private block: Matrix;
  private playerPos: Pos;
  private score = 0;
  private rafId: number | null = null;
  constructor(canvas: Canvas, board: Board, keyboard: Keyboard) {
    this.canvas = canvas;
    this.board = board;
    this.keyboard = keyboard;
    this.arena = this.createArena();
    this.block = this.createBlock(this.getRandomBlockName());
    this.playerPos = this.createPlayerDefaultPos();
    this.attachKeyboardEvent();
    this.update();
  }
  createPlayerDefaultPos(): Pos {
    return {
      x: 3,
      y: 0,
    }
  }
  createArena(): Matrix {
    return [...new Array(ROW_COUNTS)].map(() => new Array(COLUMN_COUNTS).fill(0))
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
  getRandomBlockName() {
    return this.blockNames[Math.floor(this.blockNames.length * Math.random())]
  }
  resetBlock() {
    this.block = this.createBlock(this.getRandomBlockName())
  }  
  resetPlayerPos() {
    this.playerPos = this.createPlayerDefaultPos();
  }  
  toRightPlayerPos() {
    const nextPlayerPos = {
      ...this.playerPos,
      x: this.playerPos.x + 1
    }
    if(!this.isCollideSide(nextPlayerPos)) {
      this.playerPos = nextPlayerPos;
    }
  }
  toLeftPlayerPos() {
    const nextPlayerPos = {
      ...this.playerPos,
      x: this.playerPos.x - 1
    }
    if(!this.isCollideSide(nextPlayerPos)) {
      this.playerPos = nextPlayerPos;
    }
  }
  toDownPlayerPos() {
    const nextPlayerPos = {
      ...this.playerPos,
      y: this.playerPos.y + 1
    }
    if(this.isCollideBottom(nextPlayerPos)) {
      this.merge();
      this.sweepArena();
      this.resetBlock();
      this.resetPlayerPos();
    } else {
      this.playerPos = nextPlayerPos;
    }
  }  
  toFallPlayerPos() {
    let nextPlayerPos = {
      ...this.playerPos,
      y: this.playerPos.y + 1
    }
    while(!this.isCollideBottom(nextPlayerPos)) {
      this.playerPos = nextPlayerPos;
      nextPlayerPos = {
        ...this.playerPos,
        y: this.playerPos.y + 1
      }      
    }
    this.merge();
    this.sweepArena();
    this.resetBlock();
    this.resetPlayerPos();
  }
  sweepArena() {
    const { arena } = this
    let deletedRowCount = 0
    out: for(let y = arena.length - 1; y > 0; y--) {
      for(let x = 0; x < arena[y].length; x++) {
        if(arena[y][x] === 0) {
          continue out;
        }
      }
      arena.pop()
      arena.unshift(new Array(COLUMN_COUNTS).fill(0))
      deletedRowCount++;
      y++;
    }
    const scoreToAdd = deletedRowCount * 1000;
    if(scoreToAdd !== 0) {
      this.addScore(scoreToAdd);
      this.drawScore();
    }
  }
  addScore(scoreToAdd: number) {
    this.score += scoreToAdd
  }
  drawScore() {
    this.board.setScore(this.score);
  }
  rotate() {
    const { block } = this;
    let result = [];
    for(let i = 0; i < block[0].length; i++) {
      let row = block.map(e => e[i]).reverse();
      result.push(row);
    }
    this.block = result;
    while(this.isCollideLeft(this.playerPos))  {
      this.playerPos = {
        ...this.playerPos,
        x: this.playerPos.x + 1,
      }
    }
    while(this.isCollideRight(this.playerPos)) {
      this.playerPos = {
        ...this.playerPos,
        x: this.playerPos.x - 1,
      }
    }
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
  isCollideLeft(playerPos: Pos) {
    const { block, arena } = this
    for(let y = 0; y < block.length; y++) {
      for(let x = 0; x < block[y].length; x++) {
        if(
          block[y][x] !== 0 &&
          (
            x + playerPos.x < 0 ||
            arena[y + playerPos.y][x + playerPos.x] !== 0
          )
        ) {
          return true
        }
      }
    }
    return false
  }
  isCollideRight(playerPos: Pos) {
    const { block, arena } = this
    for(let y = 0; y < block.length; y++) {
      for(let x = 0; x < block[y].length; x++) {
        if(
          block[y][x] !== 0 &&
          (
            x + playerPos.x >= this.arena[0].length ||
            arena[y + playerPos.y][x + playerPos.x] !== 0
          )
        ) {
          return true
        }
      }
    }
    return false
  }
  isCollideSide(playerPos: Pos){
    const { block, arena } = this
    for(let y = 0; y < block.length; y++) {
      for(let x = 0; x < block[y].length; x++) {
        if(
          block[y][x] !== 0 &&
          (
            x + playerPos.x < 0 ||
            x + playerPos.x >= this.arena[0].length ||
            arena[y + playerPos.y][x + playerPos.x] !== 0
          )
        ) {
          return true
        }
      }
    }
    return false
  }
  isCollideBottom(playerPos: Pos) {
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
  isLose() {
    const { arena } = this
    const topRow = arena[0]
    for(let i = 0; i < topRow.length; i++) {
      if(topRow[i] === 1) {
        return true
      }
    }
    return false
  }
  draw() {
    this.canvas.clear();
    this.canvas.drawBlock(this.block, this.playerPos);
    this.canvas.drawArena(this.arena);
  }  
  update(time = 0) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;
    if(this.dropCounter > this.dropInterval){
      this.toDownPlayerPos();
      this.dropCounter = 0;
    }
    this.draw();
    if(this.isLose()){
      this.rafId && cancelAnimationFrame(this.rafId)
      return alert(`score : ${this.score}`)
    }    
    this.rafId = requestAnimationFrame(this.update.bind(this));
  }
  attachKeyboardEvent() {
    this.keyboard.on(KeyCode.DOWN, () => {
      this.toDownPlayerPos()
    })
    this.keyboard.on(KeyCode.LEFT, () => {
      this.toLeftPlayerPos()
    })
    this.keyboard.on(KeyCode.RIGHT, () => {
      this.toRightPlayerPos()
    })
    this.keyboard.on(KeyCode.UP, () => {
      this.rotate()
    })
    this.keyboard.on(KeyCode.SPACE, () => {
      this.toFallPlayerPos()
    })
  }  
}
const $gameCanvas = <HTMLCanvasElement>$('.tetris__canvas');
const $scoreElem = <HTMLSpanElement>$(".tetris__score")
const canvas = new Canvas({
  $canvas: $gameCanvas,
  width: COLUMN_COUNTS * BLOCK_SIZE,
  height: ROW_COUNTS * BLOCK_SIZE,
  scale: BLOCK_SIZE,
});
const board = new Board({
  $score: $scoreElem,
})
const keyboard = new Keyboard();
new Game(canvas, board, keyboard);