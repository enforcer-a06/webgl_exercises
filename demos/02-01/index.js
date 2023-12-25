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

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform vec4 uColor;
  void main(){
    gl_FragColor=uColor;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const uColor = gl.getUniformLocation(program, 'uColor');
gl.uniform4f(uColor, 0.0, 1.0, 0.0, 1.0);
// const draw = (x, y) => {
//   gl.vertexAttrib2f(aPosition, x, y);
//   gl.uniform4f(uColor, x, y, 0.0, 1.0); // 片元着色器重声明的是vec4 那么下面就必须使用4f方法
//   gl.drawArrays(gl.POINTS, 0, 1);
// };

const points = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

// 缓冲区对象就webgl系统中的一块内存区域，可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用。
// 1.创建缓冲区
const buffer = gl.createBuffer();
// 2.绑定缓冲区
// gl.ARRAY_BUFFER 表示缓冲区存储的是顶点的数据
// gl.ELEMENT_ARRAT_BUFFER 表示缓冲区存储的是定点的索引值
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 3.写入数据
// gl.bufferData(target,data,type)
// target同上面的绑定类型，需要一致;
// data是写入缓冲区的数据（此例为顶点数据）
// type表示如何使用缓冲区对象中的数据，分为以下几类：
// gl.STATIC_DRAW(写入一次，绘制多次)、gl.STREAM_DRAW(写入一次，绘制若干次)、gl.DYNAMIC_DRAW(写入多次，绘制多次)
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
// 4.给attribute变量赋值
// gl.vertexAttribPointer(location,size,type,normalized,stride,offset)
// location 为attribute变量的存储位置
// size 指定每个顶点所使用的数据的个数
// type 指定数据格式 要和顶点数据类型保持一致(gl.FLOAT浮点型、gl.UNSIGNED_BYTE无符号字节、gl.SHORT短整型，gl.UNSIGNED_SHORT无符号短整型、gl.INT整型、gl.UNSIGNED_INT无符号整型)
// normalized 是否将数据进行归一化到[-1,1]这个区间
// stride 两个相邻顶点之间的字节数
// offset 数据偏移量
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
// 5.激活aPosition 可以通过disableVertexAttribArray(location);
gl.enableVertexAttribArray(aPosition);

gl.drawArrays(gl.POINTS, 0, 3);
