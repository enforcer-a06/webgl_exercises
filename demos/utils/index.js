const initShader = (gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) => {
  // webgl通过着色器绘制所有图形
  // 着色器就是让开发者自己编写一段程序 用来代替固定的渲染管线来处理图形的具体渲染
  // 对比canvas2d可以更细致的控制整个渲染过程 如canvas2d绘制矩形 只能传入一堆参数 然后等着浏览器执行 但是着色器就不一样了 他可以控制每个点的位置以及如何绘制这个点
  // 顶点着色器（逐顶点操作）用来描述空间中的一个点 通过计算获取点的位置信息
  // 片元着色器（逐片元操作）片元理解为一个一个的像素 通过计算获取像素的颜色信息

  // 创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  // 指定顶点着色器的源码
  gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE);

  // 创建片元着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  // 指定片元着色器的源码
  gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE);

  // 编译顶点着色器和片元着色器
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // 使用着色器
  // 1.创建一个程序对象 关联webgl和js程序
  const program = gl.createProgram();
  // 2.给程序对象指定使用的着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 3.跟js进行关联
  gl.linkProgram(program);
  // 4.使用程序对象
  gl.useProgram(program);

  return program;
};

export { initShader };
