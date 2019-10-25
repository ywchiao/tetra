'use strict';

window.addEventListener('load', () => {
  console.log('index.js loaded.');

  let desktop = document.querySelector('.site-body');

  desktop.addEventListener('mousemove', (e) => {
    document.getElementById('cursor-x').textContent = e.clientX;
    document.getElementById('cursor-y').textContent = e.clientY;
  });
});
