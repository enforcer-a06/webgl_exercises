void main() {
  // 绘制点的坐标 x,y,z,w(其次坐标) 降维x/w,y/w,z/w
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  // 绘制点的大小
  gl_PointSize = 30.0;
}
