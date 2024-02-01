/* eslint-disable no-unused-vars */
import { initShader } from '../utils';
import vertexSource from './vertex';
import fragmentSource from './fragment';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = initShader(gl, vertexSource, fragmentSource);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.8]);
// const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

// gl.drawArrays(gl.POINTS, 0, 3); // 单个点
// gl.drawArrays(gl.LINES, 0, 3);// 线段 两个一组 不够不画 不闭合
// gl.drawArrays(gl.LINE_STRIP, 0, 3); // 线段 首位衔接 不闭合
// gl.drawArrays(gl.LINE_LOOP, 0, 3); // 线段 首位衔接 闭合
// gl.drawArrays(gl.TRIANGLES, 0, 3); // 三角形 必须是三的倍数 不够不画
// gl.drawArrays(gl.TRIANGLES, 0, 6);
// 如果你有顶点数组[v0, v1, v2, v3, v4]，使用gl.TRIANGLE_FAN绘制时第一个三角形由顶点 v0（中心点）、v1 和 v2 组成。 第二个三角形由顶点 v0（中心点）、v2 和 v3 组成。
// 如果有更多顶点，继续以这种方式绘制，例如，第三个三角形由 v0（中心点）、v3 和 v4 组成。
// gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
// 如果你有顶点数组[v0, v1, v2, v3, v4]，第一个三角形将使用 v0, v1, v2 这三个顶点。第二个三角形将使用接下来的一组三个顶点：v1, v2, v3。
// 绘制结果：只有两个三角形会被绘制出来。这两个三角形将共享一条边（由顶点 v1 和 v2 形成）。
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  console.log(x, y);
};
