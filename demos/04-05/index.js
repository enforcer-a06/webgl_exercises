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
  uniform mat4 mat;
  void main(){
    gl_Position = mat * aPosition;
    vColor = aPosition;
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
const vertices = new Float32Array([...v0, ...v1, ...v2, ...v3, ...v4, ...v5, ...v6, ...v7]);

// 索引数据
// prettier-ignore
const indeces = new Uint8Array([
  0,1,2,0,2,3,
  0,3,4,0,4,5,
  0,5,6,0,6,1,
  1,6,7,1,7,2,
  7,4,3,7,3,2,
  4,6,7,4,6,5,
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
const pointBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);

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
