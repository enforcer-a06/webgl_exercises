import { initShader } from '../utils';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 在webgl中使用的是列主序的矩阵
const VERTEX_SHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec4 aTex;
  varying vec2 vTex;
  void main(){
    gl_Position = aPosition;
    vTex = vec2(aTex.x,aTex.y);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  varying vec2 vTex;

  void main(){
    vec4 c1 = texture2D(uSampler1,vTex);
    vec4 c2 = texture2D(uSampler2,vTex);
    gl_FragColor=c1*c2;
  }
`;

const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

const aPosition = gl.getAttribLocation(program, 'aPosition');
const aTex = gl.getAttribLocation(program, 'aTex');
const uSampler1 = gl.getUniformLocation(program, 'uSampler1');
const uSampler2 = gl.getUniformLocation(program, 'uSampler2');

const points = new Float32Array([-0.5, -0.5, 0.0, 0.0, 0.5, -0.5, 1.0, 0.0, -0.5, 0.5, 0.0, 1.0, 0.5, 0.5, 1.0, 1.0]);

const buffer = gl.createBuffer();
const BYTES = points.BYTES_PER_ELEMENT;
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 4, 0);
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2);
gl.enableVertexAttribArray(aTex);

const useTexture = (url, textureIndex, samplerLocation) => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      // 1.创建纹理对象
      const texture = gl.createTexture();
      // 2.将图片的Y轴进行翻转
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      // 3.开启纹理单元
      gl.activeTexture(gl[`TEXTURE${textureIndex}`]);
      // 4.绑定纹理对象
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // 5.设置图形放大缩小水平垂直填充逻辑逻辑
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // 6.配置纹理图形
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      // 7.给纹理变量赋值
      gl.uniform1i(samplerLocation, textureIndex);

      resolve();
    };
    img.src = url;
  });
};

const draw = async () => {
  await useTexture('/static/1.png', 0, uSampler1);
  await useTexture('/static/2.png', 1, uSampler2);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

draw();
canvas.onclick = e => {
  const {
    offsetX,
    offsetY,
    target: { width, height },
  } = e;

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const x = (offsetX - halfWidth) / halfWidth;
  const y = (halfHeight - offsetY) / halfHeight;

  console.log(x, y);
};
