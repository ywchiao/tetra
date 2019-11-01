'use strict';

let blockO = (ctx, x, y) => {
  ctx.fillStyle = 'cyan';
  ctx.fillRect(x, y, 40, 40);
};

let blockJ = (ctx, x, y) => {
  ctx.fillStyle = 'fuchsia';
  ctx.fillRect(x, y, 20, 20);
  ctx.fillRect(x, y + 20, 60, 20);
};

let blockL = (ctx, x, y) => {
  ctx.fillStyle = 'blueviolet';
  ctx.fillRect(x + 40, y, 20, 20);
  ctx.fillRect(x, y + 20, 60, 20);
};

let blockS = (ctx, x, y) => {
  ctx.fillStyle = 'dodgerblue';
  ctx.fillRect(x + 20, y, 40, 20);
  ctx.fillRect(x, y + 20, 40, 20);
};

let blockZ = (ctx, x, y) => {
  ctx.fillStyle = 'lime';
  ctx.fillRect(x, y, 40, 20);
  ctx.fillRect(x + 20, y + 20, 40, 20);
};

let blockI = (ctx, x, y) => {
  ctx.fillStyle = 'crimson';
  ctx.fillRect(x, y, 80, 20);
};

let blockT = (ctx, x, y) => {
  ctx.fillStyle = 'peru';
  ctx.fillRect(x, y, 60, 20);
  ctx.fillRect(x + 20, y + 20, 20, 20);
}

// 重繪 *遊戲盤面*
let paint = (ctx) => {
  // 將圖紙填滿背景色
  ctx.fillRect(0, 0, 640, 480);

  ctx.strokeStyle = 'slateblue';
  ctx.strokeRect(4, 4, 212, 472);
  ctx.strokeRect(220, 4, 200, 472);
  ctx.strokeRect(424, 4, 212, 472);

  blockT(ctx, 220, 10);
  blockI(ctx, 280, 10);
  blockZ(ctx, 360, 10);
  blockS(ctx, 220, 50);
  blockJ(ctx, 280, 50);
  blockL(ctx, 340, 50);
  blockO(ctx, 320, 30);
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

  // 取得能在 canvas 上繪圖的 context2d 物件
  let ctxPaint = gameCanvas.getContext('2d');

  // 設定繪圖圖紙的寛高
  gameCanvas.width = 640;
  gameCanvas.height = 480;

  // 設定圖紙背景色
  ctxPaint.fillStyle = 'mintcream';

  // 繪出基本遊戲盤面
  paint(ctxPaint);

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
});
