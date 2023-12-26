/* eslint-disable no-unused-vars */
import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// varying变量的作用就是从顶点着色器往片元着色器传递数据 类型名称必须保持一致
const VERTEX_SHADER_SOURCE = `
 attribute vec4 aPosition;
 varying vec4 vColor;
  void main(){
    vColor = aPosition;

    gl_Position = aPosition;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec4 vColor;
  void main(){
    gl_FragColor = vColor;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

gl.drawArrays(gl.TRIANGLES, 0, 3);
