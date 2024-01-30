import { initShader } from '../utils';
import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');
// 清空画布
gl.clearColor(0.0, 1.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

initShader(gl, vertexSource, fragmentSource);
// 执行绘制
// drawArrays方法3个参数。要绘制什么图形、从哪个顶点开始、使用几个顶点。
gl.drawArrays(gl.POINTS, 0, 1);
gl.drawArrays(gl.LINES, 0, 2); // 最少两个点
gl.drawArrays(gl.TRIANGLES, 0, 3); // 最少三个点
