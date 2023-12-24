import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');
// 清空画布
gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 创建顶点着色器源码
const VERTEX_SHADER_SOURCE = `
  void main(){
    // 绘制点的坐标 x,y,z,w(其次坐标) 降维x/w,y/w,z/w
    gl_Position=vec4(0.0,0.0,0.0,1.0);
    // 绘制点的大小
    gl_PointSize=30.0;
  }
`;

// 创建片元着色器源码
const FRAGMENT_SHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;

initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
// 执行绘制
// drawArrays方法3个参数。要绘制什么图形、从哪个顶点开始、使用几个顶点。
gl.drawArrays(gl.POINTS, 0, 1);
gl.drawArrays(gl.LINES, 0, 1); // 最少两个点
gl.drawArrays(gl.TRIANGLES, 0, 1); // 最少三个点
