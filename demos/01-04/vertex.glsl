attribute vec4 aPosition;
void main() {
  gl_Position = aPosition; // 默认值为 vec4(0.0,0.0,0.0,1.0)
    // 绘制点的大小
  gl_PointSize = 30.0;
}
