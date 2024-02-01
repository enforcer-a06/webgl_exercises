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
const aScale = gl.getAttribLocation(program, 'aScale');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

let x = 2;
setInterval(() => {
  x += 0.01;
  if (x > 2) {
    x = 1;
  }
  gl.vertexAttrib1f(aScale, x);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 60);

canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  console.log(x, y);
};
