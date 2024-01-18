/* eslint-disable no-unused-vars */
import { initShader, getTranslateMatrix, getViewMatrix, getOrthoMatrix, mixMatrix } from '../utils';

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

let y = -0.1;
const animation = () => {
  y += 0.001;
  if (y > 1) {
    y = -0.1;
  }
  const eye = [0.0, y, 0.2];
  const lookAt = [0.0, 0.0, 0.0];
  const up = [0.0, 1, 0.0];
  const viewMatrix = getViewMatrix(eye, lookAt, up);
  const orthoMatrix = getOrthoMatrix(-1, 1, 1, -1, 0, 1);
  // gl.uniformMatrix4fv(uMat, false, viewMatrix);
  gl.uniformMatrix4fv(uMat, false, mixMatrix(viewMatrix, orthoMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimationFrame(animation);
};
animation();
