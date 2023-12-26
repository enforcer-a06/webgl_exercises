import { initShader, getTranslateMatrix, getScaleMatrix, getRotateMatrix } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 在webgl中使用的是列主序的矩阵
const VERTEX_SHADER_SOURCE = `
 attribute vec4 aPosition;
 uniform mat4 uTranslateMatrix;
 uniform mat4 uScaleMatrix;
 uniform mat4 uRotateMatrix;
  void main(){
    gl_Position = uTranslateMatrix*uScaleMatrix*uRotateMatrix * aPosition;
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
const uTranslateMatrix = gl.getUniformLocation(program, 'uTranslateMatrix');
const uScaleMatrix = gl.getUniformLocation(program, 'uScaleMatrix');
const uRotateMatrix = gl.getUniformLocation(program, 'uRotateMatrix');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

let deg = 0;
let translateX = -1;
let scale = 0.1;
const animation = () => {
  deg -= 0.01;
  translateX += 0.01;
  scale += 0.01;
  if (translateX > 1) {
    translateX = -1;
  }
  if (scale > 1.5) {
    scale = 0.01;
  }

  const translateMatrix = getTranslateMatrix(translateX);
  const scaleMatrix = getScaleMatrix(scale);
  const rotateMatrix = getRotateMatrix(deg);
  gl.uniformMatrix4fv(uTranslateMatrix, false, translateMatrix);
  gl.uniformMatrix4fv(uScaleMatrix, false, scaleMatrix);
  gl.uniformMatrix4fv(uRotateMatrix, false, rotateMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  requestAnimationFrame(animation);
};
animation();
