/* eslint-disable no-unused-vars */
import { initShader } from '../utils';
import vertexSource from './vertex';
import fragmentSource from './fragment';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');
// 清空画布
gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = initShader(gl, vertexSource, fragmentSource);

const aPosition = gl.getAttribLocation(program, 'aPosition');

const draw = (x, y) => {
  gl.vertexAttrib2f(aPosition, x, y);

  gl.drawArrays(gl.POINTS, 0, 1);
};
draw(0, 0);

const points = [];
canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;
  // 归一化 从canvas坐标转换成webgl坐标
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  points.push({ x, y });
  points.forEach(item => {
    draw(item.x, item.y);
  });
};
