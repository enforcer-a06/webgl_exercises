/* eslint-disable no-unused-vars */
import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const VERTEX_SHADER_SOURCE = `
 attribute vec4 aPosition;
  void main(){
    gl_Position=aPosition;
    // 绘制点的大小
    gl_PointSize=10.0;
  }
`;
// uniform变量是可以使用在顶点着色器中的 这点和attribute变量不一样 但是uniform变量不能传递顶点数据
// 因为顶点数据每一个是不同的 但是uniform针对所有顶点是生效一致的 所以不可以用uniform传递顶点数据
const FRAGMENT_SHADER_SOURCE = `
  precision mediump float; // 需要手动设置精度(mediump higho lowp) 顶点着色器不需要是因为顶点着色器默认是高精度 而片元着色器默认没有指定精度
  // uniform vec2 uColor;
  uniform vec4 uColor;
  void main(){
     // gl_FragColor=vec4(uColor.r,uColor.g,0.0,1.0);
    gl_FragColor=uColor;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const uColor = gl.getUniformLocation(program, 'uColor');

const draw = (x, y) => {
  gl.vertexAttrib2f(aPosition, x, y);
  // gl.uniform2f(uColor, x, y); // 片元着色器重声明的是vec2 那么下面就必须使用2f方法
  gl.uniform4f(uColor, x, y, 0.0, 1.0); // 片元着色器重声明的是vec4 那么下面就必须使用4f方法
  gl.drawArrays(gl.POINTS, 0, 1);
};
draw(0, 0);

const points = [{ x: 0, y: 0 }];
canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;
  // 归一化
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  points.push({ x, y });
  points.forEach(item => {
    draw(item.x, item.y);
  });
};
