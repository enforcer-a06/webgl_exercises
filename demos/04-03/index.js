/* eslint-disable no-unused-vars */
import { initShader, getTranslateMatrix, getViewMatrix, getOrthoMatrix, mixMatrix } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 在webgl中使用的是列主序的矩阵
const VERTEX_SHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec4 aColor;
  varying vec4 vColor;
  uniform mat4 mat;
  void main(){
    gl_Position = aPosition;
    vColor = aColor;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec4 vColor;
  void main(){
    gl_FragColor=vColor;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const aColor = gl.getAttribLocation(program, 'aColor');
const uMat = gl.getUniformLocation(program, 'mat');

// prettier-ignore
const points = new Float32Array([
  0.75,1.0,0.6,  1.0,0.0,0.0,
  0.25,-1.0,0.6, 1.0,0.0,0.0,
  1.0,-1.0,0.6,  1.0,0.0,0.0,

  0.75,1.0,0.5,  0.0,1.0,0.0,
  0.25,-1.0,0.5, 0.0,1.0,0.0,
  1.0,-1.0,0.5,  0.0,1.0,0.0,

  0.75,1.0,0.4, 0.0,0.0,1.0,
  0.25,-1.0,0.4, 0.0,0.0,1.0,
  1.0,-1.0,0.4, 0.0,0.0,1.0,

  -0.75,1.0,0.6,  1.0,0.0,0.0,
  -0.25,-1.0,0.6, 1.0,0.0,0.0,
  -1.0,-1.0,0.6,  1.0,0.0,0.0,

  -0.75,1.0,0.5,  0.0,1.0,0.0,
  -0.25,-1.0,0.5, 0.0,1.0,0.0,
  -1.0,-1.0,0.5,  0.0,1.0,0.0,

  -0.75,1.0,0.4, 0.0,0.0,1.0,
  -0.25,-1.0,0.4, 0.0,0.0,1.0,
  1.0,-1.0,0.4, 0.0,0.0,1.0,
]);

const buffer = gl.createBuffer();
const BYTES = points.BYTES_PER_ELEMENT;
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, BYTES * 6, 0);
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, BYTES * 6, BYTES * 3);
gl.enableVertexAttribArray(aColor);

gl.drawArrays(gl.TRIANGLES, 0, 3 * 6);
// let y = -0.1;
// const animation = () => {
//   y += 0.001;
//   if (y > 1) {
//     y = -0.1;
//   }
//   const eye = [0.0, y, 0.2];
//   const lookAt = [0.0, 0.0, 0.0];
//   const up = [0.0, 1, 0.0];
//   const viewMatrix = getViewMatrix(eye, lookAt, up);
//   const orthoMatrix = getOrthoMatrix(-1, 1, 1, -1, 0, 1);
//   // gl.uniformMatrix4fv(uMat, false, viewMatrix);
//   gl.uniformMatrix4fv(uMat, false, mixMatrix(viewMatrix, orthoMatrix));
//   gl.drawArrays(gl.TRIANGLES, 0, 3);

//   requestAnimationFrame(animation);
// };
// animation();
