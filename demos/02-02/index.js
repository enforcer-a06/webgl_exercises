/* eslint-disable no-unused-vars */
import { initShader } from '../utils';
import vertexSource from './vertex';
import fragmentSource from './fragment';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = initShader(gl, vertexSource, fragmentSource);

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);
const size = new Float32Array([10, 20, 30]);
// 多缓冲区
const aPosition = gl.getAttribLocation(program, 'aPosition');
const aPointSize = gl.getAttribLocation(program, 'aPointSize');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const sizeBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPointSize);

gl.drawArrays(gl.POINTS, 0, 3);
