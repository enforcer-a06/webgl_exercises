const canvas = document.getElementById('canvas');

// const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'green';

// console.time('canvas2d');
// let i = 0;
// while (i++ < 100000) {
//   ctx.fillRect(0, 0, 512, 512);
// }
// console.timeEnd('canvas2d'); // 72.09 ms

const gl = canvas.getContext('webgl');
// 指定清空canvas的颜色 接收4个参数 取值从0.0-1.0 r g b a 默认为白色
gl.clearColor(0.0, 1.0, 0.0, 1.0);
console.time('webgl');
// 如何清空颜色缓冲区 清空颜色缓冲区（COLOR_BUFFER_BIT）
// clearColor(0.0, 1.0, 0.0, 1.0)配合使用->清空颜色缓冲区（COLOR_BUFFER_BIT）
// clearDepth(1.0)配合使用->清空深度缓冲区（DEPTH_BUFFER_BIT）
// clearStencil(0)配合使用->清空模板缓冲区（STENCIL_BUFFER_BIT）

gl.clear(gl.COLOR_BUFFER_BIT);
let i = 0;
while (i++ < 100000) {
  gl.clear(gl.COLOR_BUFFER_BIT);
}
console.timeEnd('webgl'); // 5.89 ms
