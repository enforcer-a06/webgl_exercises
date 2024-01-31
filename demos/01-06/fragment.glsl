precision mediump float; // 需要手动设置精度(mediump higho lowp) 顶点着色器不需要是因为顶点着色器默认是高精度 而片元着色器默认没有指定精度
  // uniform vec2 uColor;
uniform vec4 uColor;
void main() {
     // gl_FragColor=vec4(uColor.r,uColor.g,0.0,1.0);
  gl_FragColor = uColor;
}
