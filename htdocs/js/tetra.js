'use strict';

const Board = {
  HEIGHT: 23,
  WIDTH: 11,
  PADDING: 2,
}

const Grid = {
  WIDTH: 20,
  HEIGHT: 20,
}

let block = {
  _elapsed: 0,

  _color: 'peru',

  _phase: 0,

  _left: 4,

  _top: 1,

  _grids: [
    [ [0, 1],[1, 1], [2, 1], [1, 0] ],
    [ [1, 0],[1, 1], [1, 2], [2, 1] ],
    [ [0, 1],[1, 1], [2, 1], [1, 2] ],
    [ [1, 0],[1, 1], [1, 2], [0, 1] ],
  ],


  paint: function (ctx) {
    ctx.save();

    ctx.fillStyle = this._color;

    for (let offset of this._grids[this._phase]) {
      ctx.fillRect(
        (this._left + offset[0]) * Grid.WIDTH + 210 + Board.PADDING,
        (this._top + offset[1]) * Grid.HEIGHT + Board.PADDING,
        Grid.WIDTH, Grid.HEIGHT
      );
    }

    ctx.restore();
  },

  update: function (delta) {
    this._elapsed += delta

    while (this._elapsed > 512) {
      this._top = (this._top + 1) % 20;
      this._phase = (this._phase + 1) % 4;

      this._elapsed -= 256;
    }
  }
};

let game = {
  _loop: function (ticks) {
    if (!this._startAt) {
      this._startAt = ticks;
    }

    this._update(ticks);
    this._paint();

    requestAnimationFrame(this._loop.bind(this));
  },

  // 重繪 *遊戲盤面*
  _paint: function () {
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

    block.paint(ctx);
  },

  _update: function (ticks) {
    if (this._lastUpdate) {
      block.update(ticks - this._lastUpdate);
    }

    this._lastUpdate = ticks;
  },

  pause: function () {
    cancelAnimationFrame(this._tickHandler);
  },

  start: function () {
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
