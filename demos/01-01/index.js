const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// 指定清空canvas的颜色 接收4个参数 取值从0.0-1.0 r g b a 默认为白色
gl.clearColor(0.0, 1.0, 0.0, 1.0);

// 如何清空画布缓冲区
// clearColor(0.0, 1.0, 0.0, 1.0)配合使用->清空颜色缓冲区（COLOR_BUFFER_BIT）
// clearDepth(1.0)配合使用->清空深度缓冲区（DEPTH_BUFFER_BIT）
// clearStencil(0)配合使用->清空模板缓冲区（STENCIL_BUFFER_BIT）
gl.clear(gl.COLOR_BUFFER_BIT);
