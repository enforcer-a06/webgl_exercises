attribute vec4 aPosition;
attribute float aDeg;
void main() {
  gl_Position.x = aPosition.x * cos(aDeg) - aPosition.y * sin(aDeg);
  gl_Position.y = aPosition.x * sin(aDeg) + aPosition.y * cos(aDeg);
  gl_Position.z = aPosition.z;
  gl_Position.w = aPosition.w;
}
