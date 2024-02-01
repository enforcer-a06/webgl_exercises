attribute vec4 aPosition;
attribute float aScale;
void main() {
  gl_Position = vec4(aPosition.x * aScale, aPosition.y * aScale, aPosition.z, 1.0);
  gl_PointSize = 10.0;
}
