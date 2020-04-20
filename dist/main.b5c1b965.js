parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"L29w":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}var r;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e[e.ESC=27]="ESC",e[e.SPACE=32]="SPACE",e[e.LEFT=37]="LEFT",e[e.UP=38]="UP",e[e.RIGHT=39]="RIGHT",e[e.DOWN=40]="DOWN"}(r=exports.KeyCode||(exports.KeyCode={}));var o=function(){function t(){var n=this;e(this,t),this.deps={},document.addEventListener("keydown",function(e){e.preventDefault(),n.publish(e.keyCode)})}return n(t,[{key:"hasOwn",value:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},{key:"on",value:function(e,t){this.hasOwn(this.deps,e)||(this.deps[e]=[]),this.deps[e].push(t)}},{key:"publish",value:function(e){this.hasOwn(this.deps,e)&&this.deps[e].forEach(function(e){return e()})}}]),t}();exports.default=o;
},{}],"kxCl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.COLUMN_COUNTS=10,exports.ROW_COUNTS=20,exports.BLOCK_SIZE=30;
},{}],"g7hl":[function(require,module,exports) {
"use strict";function e(e){return n(e)||a(e)||r(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){if(e){if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}function a(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function n(e){if(Array.isArray(e))return i(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e,t,r){return t&&s(e.prototype,t),r&&s(e,r),e}var c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var h=c(require("./Keyboard")),u=require("./constants"),f=document.querySelector.bind(document),y=function(){function e(t){var r=t.$canvas,a=t.width,n=t.height,i=t.scale;o(this,e);var s=r.getContext("2d");s.canvas.width=a,s.canvas.height=n,s.scale(i,i),this.$canvas=r,this.ctx=s}return l(e,[{key:"clear",value:function(){this.ctx.clearRect(0,0,this.$canvas.width,this.$canvas.height)}},{key:"drawBlock",value:function(e,t){var r=this;e.forEach(function(e,a){e.forEach(function(e,n){0!==e&&r.ctx.fillRect(n+t.x,a+t.y,1,1)})})}},{key:"drawArena",value:function(e){var t=this;e.forEach(function(e,r){e.forEach(function(e,a){0!==e&&t.ctx.fillRect(a,r,1,1)})})}}]),e}(),v=function(){function e(t){var r=t.$score;o(this,e),this.$score=r}return l(e,[{key:"setScore",value:function(e){this.$score.innerText=String(e)}}]),e}(),d=function(){function t(e,r,a){o(this,t),this.dropInterval=1e3,this.lastTime=0,this.dropCounter=0,this.blockNames="ILJOTSZ",this.score=0,this.rafId=null,this.canvas=e,this.board=r,this.keyboard=a,this.arena=this.createArena(),this.block=this.createBlock(this.getRandomBlockName()),this.playerPos=this.createPlayerDefaultPos(),this.attachKeyboardEvent(),this.update()}return l(t,[{key:"createPlayerDefaultPos",value:function(){return{x:3,y:0}}},{key:"createArena",value:function(){return e(new Array(u.ROW_COUNTS)).map(function(){return new Array(u.COLUMN_COUNTS).fill(0)})}},{key:"createBlock",value:function(e){switch(e){case"T":return[[0,0,0],[1,1,1],[0,1,0]];case"O":return[[1,1],[1,1]];case"L":return[[0,1,0],[0,1,0],[0,1,1]];case"J":return[[0,1,0],[0,1,0],[1,1,0]];case"I":return[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]];case"S":return[[0,1,1],[1,1,0],[0,0,0]];case"Z":return[[1,1,0],[0,1,1],[0,0,0]];default:throw new Error("invalid block!")}}},{key:"getRandomBlockName",value:function(){return this.blockNames[Math.floor(this.blockNames.length*Math.random())]}},{key:"resetBlock",value:function(){this.block=this.createBlock(this.getRandomBlockName())}},{key:"resetPlayerPos",value:function(){this.playerPos=this.createPlayerDefaultPos()}},{key:"toRightPlayerPos",value:function(){var e=Object.assign(Object.assign({},this.playerPos),{x:this.playerPos.x+1});this.isCollideSide(e)||(this.playerPos=e)}},{key:"toLeftPlayerPos",value:function(){var e=Object.assign(Object.assign({},this.playerPos),{x:this.playerPos.x-1});this.isCollideSide(e)||(this.playerPos=e)}},{key:"toDownPlayerPos",value:function(){var e=Object.assign(Object.assign({},this.playerPos),{y:this.playerPos.y+1});this.isCollideBottom(e)?(this.merge(),this.sweepArena(),this.resetBlock(),this.resetPlayerPos()):this.playerPos=e}},{key:"toFallPlayerPos",value:function(){for(var e=Object.assign(Object.assign({},this.playerPos),{y:this.playerPos.y+1});!this.isCollideBottom(e);)this.playerPos=e,e=Object.assign(Object.assign({},this.playerPos),{y:this.playerPos.y+1});this.merge(),this.sweepArena(),this.resetBlock(),this.resetPlayerPos()}},{key:"sweepArena",value:function(){var e=this.arena,t=0;e:for(var r=e.length-1;r>0;r--){for(var a=0;a<e[r].length;a++)if(0===e[r][a])continue e;e.pop(),e.unshift(new Array(u.COLUMN_COUNTS).fill(0)),t++,r++}var n=1e3*t;0!==n&&(this.addScore(n),this.drawScore())}},{key:"addScore",value:function(e){this.score+=e}},{key:"drawScore",value:function(){this.board.setScore(this.score)}},{key:"rotate",value:function(){for(var e=this.block,t=[],r=function(r){var a=e.map(function(e){return e[r]}).reverse();t.push(a)},a=0;a<e[0].length;a++)r(a);for(this.block=t;this.isCollideLeft(this.playerPos);)this.playerPos=Object.assign(Object.assign({},this.playerPos),{x:this.playerPos.x+1});for(;this.isCollideRight(this.playerPos);)this.playerPos=Object.assign(Object.assign({},this.playerPos),{x:this.playerPos.x-1})}},{key:"merge",value:function(){var e=this.block,t=this.arena,r=this.playerPos;e.forEach(function(e,a){e.forEach(function(e,n){0!==e&&(t[a+r.y][n+r.x]=e)})})}},{key:"isCollideLeft",value:function(e){for(var t=this.block,r=this.arena,a=0;a<t.length;a++)for(var n=0;n<t[a].length;n++)if(0!==t[a][n]&&(n+e.x<0||0!==r[a+e.y][n+e.x]))return!0;return!1}},{key:"isCollideRight",value:function(e){for(var t=this.block,r=this.arena,a=0;a<t.length;a++)for(var n=0;n<t[a].length;n++)if(0!==t[a][n]&&(n+e.x>=this.arena[0].length||0!==r[a+e.y][n+e.x]))return!0;return!1}},{key:"isCollideSide",value:function(e){for(var t=this.block,r=this.arena,a=0;a<t.length;a++)for(var n=0;n<t[a].length;n++)if(0!==t[a][n]&&(n+e.x<0||n+e.x>=this.arena[0].length||0!==r[a+e.y][n+e.x]))return!0;return!1}},{key:"isCollideBottom",value:function(e){for(var t=this.block,r=this.arena,a=0;a<t.length;a++)for(var n=0;n<t[a].length;n++)if(0!==t[a][n]&&(r[a+e.y]&&0!==r[a+e.y][n+e.x]||a+e.y===20))return!0;return!1}},{key:"isLose",value:function(){for(var e=this.arena[0],t=0;t<e.length;t++)if(1===e[t])return!0;return!1}},{key:"draw",value:function(){this.canvas.clear(),this.canvas.drawBlock(this.block,this.playerPos),this.canvas.drawArena(this.arena)}},{key:"update",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=e-this.lastTime;if(this.lastTime=e,this.dropCounter+=t,this.dropCounter>this.dropInterval&&(this.toDownPlayerPos(),this.dropCounter=0),this.draw(),this.isLose())return this.rafId&&cancelAnimationFrame(this.rafId),alert("score : ".concat(this.score));this.rafId=requestAnimationFrame(this.update.bind(this))}},{key:"attachKeyboardEvent",value:function(){var e=this;this.keyboard.on(h.KeyCode.DOWN,function(){e.toDownPlayerPos()}),this.keyboard.on(h.KeyCode.LEFT,function(){e.toLeftPlayerPos()}),this.keyboard.on(h.KeyCode.RIGHT,function(){e.toRightPlayerPos()}),this.keyboard.on(h.KeyCode.UP,function(){e.rotate()}),this.keyboard.on(h.KeyCode.SPACE,function(){e.toFallPlayerPos()})}}]),t}(),P=f(".tetris__canvas"),p=f(".tetris__score"),k=new y({$canvas:P,width:u.COLUMN_COUNTS*u.BLOCK_SIZE,height:u.ROW_COUNTS*u.BLOCK_SIZE,scale:u.BLOCK_SIZE}),b=new v({$score:p}),g=new h.default;new d(k,b,g);
},{"./Keyboard":"L29w","./constants":"kxCl"}]},{},["g7hl"], null)
//# sourceMappingURL=main.b5c1b965.js.map