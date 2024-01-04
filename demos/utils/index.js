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

// 平移矩阵
const getTranslateMatrix = (x = 0, y = 0, z = 0) => {
  return new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, x, y, z, 1]);
};
// 缩放矩阵
const getScaleMatrix = (tx = 1, ty = 1, tz = 1) => {
  return new Float32Array([tx, 0.0, 0.0, 0.0, 0.0, ty, 0.0, 0.0, 0.0, 0.0, tz, 0.0, 0, 0, 0, 1]);
};

// 绕Z轴旋转的旋转矩阵
const getRotateMatrix = deg => {
  const { cos, sin } = Math;
  return new Float32Array([cos(deg), sin(deg), 0.0, 0.0, -sin(deg), cos(deg), 0.0, 0.0, 0.0, 0.0, 1, 0.0, 0.0, 0.0, 0.0, 1]);
};

// 矩阵相乘
const mixMatrix = (matA, matB) => {
  const result = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    result[i] = matA[i] * matB[0] + matA[i + 4] * matB[1] + matA[i + 8] * matB[2] + matA[i + 12] * matB[3];
    result[i + 4] = matA[i] * matB[4] + matA[i + 4] * matB[5] + matA[i + 8] * matB[6] + matA[i + 12] * matB[7];
    result[i + 8] = matA[i] * matB[8] + matA[i + 4] * matB[9] + matA[i + 8] * matB[10] + matA[i + 12] * matB[11];
    result[i + 12] = matA[i] * matB[12] + matA[i + 4] * matB[13] + matA[i + 8] * matB[14] + matA[i + 12] * matB[15];
  }
  return result;
};

// 向量归一化
const normalized = vec3 => {
  const [x, y, z] = vec3;
  const sum = x * x + y * y + z * z;
  const length = Math.sqrt(sum);
  return [x / length, y / length, z / length];
};

// 叉积
const cross = (vec3A, vec3B) => {
  return new Float32Array([vec3A[1] * vec3B[2] - vec3A[2] * vec3B[1], vec3A[2] * vec3B[0] - vec3A[0] * vec3B[2], vec3A[0] * vec3B[1] - vec3A[1] * vec3B[0]]);
};

// 点积
const dot = (vec3A, vec3B) => {
  return vec3A[0] * vec3B[0] + vec3A[1] * vec3B[1] + vec3A[2] * vec3B[2];
};

// 向量的差
const minus = (vec3A, vec3B) => {
  return new Float32Array([vec3A[0] - vec3B[0], vec3A[1] - vec3B[1], vec3A[2] - vec3B[2]]);
};

const getViewMatrix = (eye, lookAt, up) => {
  // 视点
  const vec3Eye = new Float32Array([...eye]);
  // 目标点
  const vec3LookAt = new Float32Array([...lookAt]);
  // 上方向
  let vec3Up = new Float32Array([...up]);

  let z = minus(vec3Eye, vec3LookAt);
  z = normalized(z);
  vec3Up = normalized(vec3Up);
  let x = cross(z, vec3Up);
  x = normalized(x);
  const y = cross(x, z);

  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, vec3Eye), -dot(y, vec3Eye), -dot(z, vec3Eye), 1]);
};

export { initShader, getTranslateMatrix, getScaleMatrix, getRotateMatrix, mixMatrix, normalized, cross, dot, minus, getViewMatrix };
