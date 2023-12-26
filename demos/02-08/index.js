/* eslint-disable no-unused-vars */
import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 在webgl中使用的是列主序的矩阵
const VERTEX_SHADER_SOURCE = `
 attribute vec4 aPosition;
 uniform mat4 mat;
  void main(){
    gl_Position = mat * aPosition;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform vec4 uColor;
  void main(){
    gl_FragColor=uColor;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const uMat = gl.getUniformLocation(program, 'mat');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const getTranslateMatrix = (x = 0, y = 0, z = 0) => {
  return new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, x, y, z, 1]);
};
let x = -1;
const animation = () => {
  x += 0.01;
  if (x > 1) {
    x = -1;
  }
  const matrix = getTranslateMatrix(x, x);
  gl.uniformMatrix4fv(uMat, false, matrix); // 第二个参数在webgl中恒为false
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  requestAnimationFrame(animation);
};
animation();
