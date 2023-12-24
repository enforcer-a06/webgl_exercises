import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');
// 清空画布
gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 创建顶点着色器源码
const VERTEX_SHADER_SOURCE = `
 attribute vec4 aPosition;
  void main(){
    gl_Position=aPosition; // 默认值为 vec4(0.0,0.0,0.0,1.0)
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

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
// gl.vertexAttrib1f(localtion, v0);
// gl.vertexAttrib2f(localtion, v0, v1);
// gl.vertexAttrib3f(localtion, v0, v1, v2);
// gl.vertexAttrib4f(localtion, v0, v1, v2, v3);
gl.vertexAttrib4f(aPosition, 0.5, 0.5, 0.0, 1.0);

gl.drawArrays(gl.POINTS, 0, 1);
