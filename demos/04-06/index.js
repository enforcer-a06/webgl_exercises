/* eslint-disable no-unused-vars */
import { initShader, getTranslateMatrix, getViewMatrix, getPerspective, mixMatrix, getRotateMatrix } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 在webgl中使用的是列主序的矩阵
const VERTEX_SHADER_SOURCE = `
  attribute vec4 aPosition;
  varying vec4 vColor;
  attribute vec4 aColor;
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

// prettier-ignore
const vertices = new Float32Array([
  // 0123
    1, 1, 1,
    -1, 1, 1,
    -1,-1, 1,
    1,-1, 1,
    // 0345
    1, 1, 1,
    1,-1, 1,
    1,-1,-1,
    1, 1,-1,
    // 0156
    1, 1, 1,
    1, 1, -1,
    -1, 1,-1,
    -1, 1,1,
    // 1267
    -1, 1, 1,
    -1,1, -1,
    -1, -1,-1,
    -1,-1,1,
    // 2347
    -1,-1, 1,
    1,-1, 1,
    1,-1,-1,
    -1,-1,-1,
    // 4567
    1,-1,-1,
    1, 1,-1,
    -1, 1,-1,
    -1,-1,-1,
]);

// 索引数据
// prettier-ignore
const indeces = new Uint8Array([
  0,1,2,0,2,3,
  4,5,6,4,6,7,
  8,9,10,8,10,11,
  12,13,14,12,14,15,
  16,17,18,16,18,19,
  20,21,22,20,22,23,
]);

// prettier-ignore
const colorData = new Float32Array([
  0.4,0.4,1.0,0.4,0.4,1.0,0.4,0.4,1.0,0.4,0.4,1.0,
  0.4,1.0,0.4,0.4,1.0,0.4,0.4,1.0,0.4,0.4,1.0,0.4,
  1.0,0.4,0.4,1.0,0.4,0.4,1.0,0.4,0.4,1.0,0.4,0.4,
  1.0,1.0,0.4,1.0,1.0,0.4,1.0,1.0,0.4,1.0,1.0,0.4,
  1.0,0.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,
  0.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,
])

const pointBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aColor);

gl.drawElements(gl.TRIANGLES, indeces.length, gl.UNSIGNED_BYTE, 0);

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
  gl.drawElements(gl.TRIANGLES, indeces.length, gl.UNSIGNED_BYTE, 0);

  requestAnimationFrame(draw);
}

draw();
