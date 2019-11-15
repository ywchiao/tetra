'use strict';

const Game = {
  ROWS: 29,
  COLS: 16,
};

const gameBoard = {
  PADDING: 2,

  ROW: Array(Game.COLS).fill(''),

  grids: Array(Game.ROWS * Game.COLS).fill(''),

  fillGrid: function (block) {
    block.grids.forEach(grid => {
      this.grids[grid[1] * Game.COLS + grid[0]] = block.color;
    });

    for (let r = block.top; r <= block.bottom; r++) {
      this._clear(r);
    }
  },

  _clear: function (row) {
    let idx = row * Game.COLS;

    if (
      this._isFinished(this.grids.slice(idx, idx + Game.COLS))
    ) {
      this.grids = this.ROW.concat(
        this.grids.slice(0, this.row * Game.COLS),
        this.grids.slice((this.row + 1) * Game.COLs)
      );
    }
  },

  _isFinished: function (row) {
    return !row.some(grid => {
      return grid == ''
    });
  },

  isVacant: function (block) {
    return block.grids.every(grid => {
      return this.grids[grid[1] * Game.COLS + grid[0]] == ''
    });
  },
}

const Grid = {
  WIDTH: 16,
  HEIGHT: 16,
}

class Tetromino {
  #left = -1;
  #top = -1;

  constructor (left, top) {
    this.#left = left;
    this.#top = top;
  }

  get color() {
    return this._color;
  }

  get left () {
    return this.#left;
  }

  get top () {
    return this.#top;
  }

  get bottom () {
    return this.#top + this._rows[this._phase] - 1;
  }

  get grids() {
    return this._pattern[this._phase].map(grid => {
      return [this.#left + grid[0], this.#top + grid[1]];
    });
  }

  get cols() {
    return this._cols[this._phase];
  }

  moveTo(x, y) {
    this.#left = x;
    this.#top = y;
  }

  shiftLeft () {
    this.#left -= 1;
  }

  shiftRight () {
    this.#left += 1;
  }

  rotateClock () {
    this._phase = (this._phase + 1) % this._pattern.length;
  }

  rotateCounterClock () {
    this._phase = (this._phase - 1) % this._pattern.length;
  }
}

class BlockI extends Tetromino {
  _color = 'crimson';

  _cols = [ 4, 1 ];
  _rows = [ 1, 4 ];

  _pattern = [
    [ [0, 1],[1, 1], [2, 1], [3, 1] ],
    [ [1, 0],[1, 1], [1, 2], [1, 3] ],
  ];

  constructor(left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockJ extends Tetromino {
  _color = 'fuchsia';

  _cols = [ 2, 3, 2, 3 ];
  _rows = [ 3, 2, 3, 2 ];

  _pattern = [
    [ [1, 0], [1, 1], [1, 2], [0, 2] ],
    [ [2, 1], [1, 1], [0, 1], [0, 0] ],
    [ [0, 2], [0, 1], [0, 0], [1, 0] ],
    [ [0, 0], [1, 0], [2, 0], [2, 1] ],
  ];

  constructor(left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockL extends Tetromino {
  _color = 'blueviolet';

  _cols = [ 2, 3, 2, 3 ];
  _rows = [ 3, 2, 3, 2 ];

  _pattern = [
    [ [0, 0], [0, 1], [0, 2], [1, 2] ],
    [ [2, 0], [1, 0], [0, 0], [0, 1] ],
    [ [1, 2], [1, 1], [1, 0], [0, 0] ],
    [ [0, 1], [1, 1], [2, 1], [2, 0] ],
  ];

  constructor(left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockO extends Tetromino {
  _color = 'cyan';

  _cols = [ 2 ];
  _rows = [ 2 ];

  _pattern = [
    [ [0, 0],[1, 0], [0, 1], [1, 1] ],
  ];

  constructor (left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockS extends Tetromino {
  _color = 'dodgerblue';

  _cols = [ 3, 2 ];
  _rows = [ 2, 3 ];

  _pattern = [
    [ [2, 0], [1, 0], [1, 1], [0, 1] ],
    [ [0, 0], [0, 1], [1, 1], [1, 2] ],
  ];

  constructor (left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockT extends Tetromino {
  _color = 'peru';

  _cols = [ 3, 2, 3, 2 ];
  _rows = [ 2, 3, 2, 3 ];

  _pattern = [
    [ [0, 1], [1, 1], [2, 1], [1, 0] ],
    [ [0, 0], [0, 1], [0, 2], [1, 1] ],
    [ [0, 0], [1, 0], [2, 0], [1, 1] ],
    [ [1, 0], [1, 1], [1, 2], [0, 1] ],
  ];

  constructor (left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

class BlockZ extends Tetromino {
  _color = 'lime';

  _cols = [ 3, 2 ];
  _rows = [ 2, 3 ];

  _pattern = [
    [ [0, 0], [1, 0], [1, 1], [2, 1] ],
    [ [1, 0], [1, 1], [0, 1], [0, 2] ],
  ];

  constructor (left, top) {
    super(left, top);

    this._phase = Math.floor(Math.random() * this._pattern.length);
  }
};

let game = {
  _elapsed: 0,

  _loop: function (ticks) {
    if (!this._startAt) {
      this._startAt = ticks;
    }

    this._update(ticks);
    this._paint();

    requestAnimationFrame(this._loop.bind(this));
  },

  _nextBlock: function () {
    let blocks = [
      BlockI, BlockJ, BlockL, BlockO, BlockS, BlockT, BlockZ,
    ];

    return new blocks[Math.floor(Math.random() * blocks.length)]();
  },

  // 重繪 *遊戲盤面*
  _paint: function () {
    let block = this._block;

    // 取得能在 canvas 上繪圖的 context2d 物件
    let ctx = document.querySelector('canvas').getContext('2d');

    // 設定圖紙背景色
    ctx.fillStyle = 'mintcream';

    // 將圖紙填滿背景色
    ctx.fillRect(0, 0, 640, 480);

    ctx.strokeStyle = 'slateblue';
    ctx.strokeRect(4, 4, 198, 472);
    ctx.strokeRect(208, 4, 224, 472);
    ctx.strokeRect(438, 4, 198, 472);

    //gameBoard.paint(ctx);
    this._paintBoard(ctx);
    this._paintBlock(ctx);
  },

  _paintBoard: function (ctx) {
    ctx.save();

    gameBoard.grids.forEach( (color, i) => {
      if (color != '') {
        ctx.fillStyle = color;

        ctx.fillRect(
          (i % Game.COLS) * Grid.WIDTH + 210 + gameBoard.PADDING,
          (Math.floor(i / Game.COLS)) * Grid.HEIGHT + 6 + gameBoard.PADDING,
          Grid.WIDTH, Grid.HEIGHT
        );
      }
    });

    ctx.restore();
  },

  _paintBlock: function (ctx) {
    let block = this._block;

    ctx.save();

    ctx.fillStyle = block.color;

    block.grids.forEach(grid => {
      ctx.fillRect(
        grid[0] * Grid.WIDTH + 210 + gameBoard.PADDING,
        grid[1] * Grid.HEIGHT + 6 + gameBoard.PADDING,
        Grid.WIDTH, Grid.HEIGHT
      );
    });

    ctx.restore();
  },

  _translate: function (grids) {
  },

  _update: function (ticks) {
    if (this._lastUpdate) {
      this._elapsed += (ticks - this._lastUpdate);

      while (this._elapsed > 512) {
        let block = this._block;

        block.moveTo(block.left, block.top + 1);

        if (block.bottom == gameBoard.HEIGHT || !gameBoard.isVacant(block)) {
          block.moveTo(block.left, block.top - 1);

          gameBoard.fillGrid(block);

          this._block = this._next;
          this._next = this._nextBlock();

          this._block.moveTo(Math.floor((Game.COLS - this._block.cols) / 2) - 1, 0);
        }

        this._elapsed -= 512;
      }
    }

    this._lastUpdate = ticks;
  },

  pause: function () {
    cancelAnimationFrame(this._tickHandler);
  },

  start: function () {
    this._block = this._nextBlock();
    this._next = this._nextBlock();

    this._tickHandler = requestAnimationFrame(this._loop.bind(this));
  },
};

/**
 * tetra 程式進入點
 *
 * @callback
 * @param 'load': DOM 事件名
 * @returns {undefined}
 */
window.addEventListener('load', () => {
  console.log('tetra.js loaded.');

  // 準備承載 *遊戲標題* (title) 的 HTML 元素
  let gameTitle = document.createElement('span');
  gameTitle.textContent = 'Tetra!';

  // 準備承載 *遊戲版頭* (header) 的 HTML 元素
  let gameHeader = document.createElement('header');
  gameHeader.className = 'card-header';

  // 將 *遊戲標題* 放上 *遊戲版頭*
  gameHeader.appendChild(gameTitle);

  // 準備 *遊戲盤面* 的繪圖圖紙 (canvas)
  let gameCanvas = document.createElement('canvas');

  // 設定繪圖圖紙的寛高
  gameCanvas.width = 640;
  gameCanvas.height = 480;

  // 準備承載 *遊戲內容* 的 HTML 元素
  let gameContent = document.createElement('article');
  gameContent.className = 'card-content';

  // 將 *遊戲盤面* 放上 *遊戲內容* 容器
  gameContent.appendChild(gameCanvas);

  // 準備 *遊戲桌面* 的 HTML 元素
  let gameDesktop = document.createElement('section');
  gameDesktop.className = 'card';

  // 將 *遊戲版頭* 放上 *遊戲桌面*
  gameDesktop.appendChild(gameHeader);

  // 將 *遊戲內容* 放上 *遊戲桌面*
  gameDesktop.appendChild(gameContent);

  // 將 *遊戲桌面* 放上 *網頁*
  let desktop = document.querySelector('.site-body');
  desktop.appendChild(gameDesktop);

  /**
   * 滑鼠游標移動追蹤
   *
   * @callback
   * @param 'mousemove': DOM 事件名
   * @param e: DOM event 物件
   * @return {undefined}
   */
  desktop.addEventListener('mousemove', (e) => {
    document.getElementById('cursor-x').textContent = e.clientX;
    document.getElementById('cursor-y').textContent = e.clientY;
  });

  game.start();
});
