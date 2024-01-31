/* eslint-disable no-unused-vars */
import { initShader } from '../utils';
import vertexSource from './vertex';
import fragmentSource from './fragment';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = initShader(gl, vertexSource, fragmentSource);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const uColor = gl.getUniformLocation(program, 'uColor');

const draw = (x, y) => {
  gl.vertexAttrib2f(aPosition, x, y);
  // gl.uniform2f(uColor, x, y); // 片元着色器重声明的是vec2 那么下面就必须使用2f方法
  gl.uniform4f(uColor, x, y, 0.0, 1.0); // 片元着色器重声明的是vec4 那么下面就必须使用4f方法
  gl.drawArrays(gl.POINTS, 0, 1);
};
draw(0, 0);

const points = [{ x: 0, y: 0 }];
canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;
  // 归一化
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  points.push({ x, y });
  points.forEach(item => {
    draw(item.x, item.y);
  });
};
