/* eslint-disable no-unused-vars */
import { initShader, getTranslateMatrix, getViewMatrix, getPerspective, mixMatrix, getRotateMatrix } from '../utils';

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
    gl_Position = mat * aPosition;
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

// 顶点数据 正方体的8个顶点
const v0 = [1, 1, 1];
const v1 = [-1, 1, 1];
const v2 = [-1, -1, 1];
const v3 = [1, -1, 1];
const v4 = [1, -1, -1];
const v5 = [1, 1, -1];
const v6 = [-1, 1, -1];
const v7 = [-1, -1, -1];
// prettier-ignore
const points = new Float32Array([
  ...v0,...v1,...v2, ...v0,...v2, ...v3, // 前
  ...v0,...v3,...v4, ...v0,...v4, ...v5, // 右
  ...v0,...v5,...v6, ...v0,...v6, ...v1, // 上
  ...v1,...v6,...v7, ...v1,...v7, ...v2, // 左
  ...v7,...v4,...v3, ...v7,...v3, ...v2, // 下
  ...v4,...v7,...v6, ...v4,...v6, ...v5, // 后
]);

// prettier-ignore
const colorData = new Float32Array([
    1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,
    0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,
    0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,
    1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,
  ])

const buffer = gl.createBuffer();
const BYTES = points.BYTES_PER_ELEMENT;
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aColor);

gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

const eyex = 3;
const eyey = 3;
const eyez = 5;
let deg = 0;

function draw() {
  deg += 0.01;
  const rotateMatrix = getRotateMatrix(deg);
  const viewMatrix = getViewMatrix([eyex, eyey, eyez], [0.0, 0.0, 0.0], [0.0, 0.6, 0.0]);
  const perspectiveMatrix = getPerspective(30, canvas.width / canvas.height, 100, 1);

  gl.enable(gl.DEPTH_TEST);
  gl.uniformMatrix4fv(uMat, false, mixMatrix(mixMatrix(perspectiveMatrix, viewMatrix), rotateMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

  requestAnimationFrame(draw);
}

draw();
