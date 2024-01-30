import { initShader } from '../utils';
import vertexSource from './vertex';
import fragmentSource from './fragment';

const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = initShader(gl, vertexSource, fragmentSource);

const aPosition = gl.getAttribLocation(program, 'aPosition');
// gl.vertexAttrib1f(localtion, v0);
// gl.vertexAttrib2f(localtion, v0, v1);
// gl.vertexAttrib3f(localtion, v0, v1, v2);
// gl.vertexAttrib4f(localtion, v0, v1, v2, v3);
gl.vertexAttrib4f(aPosition, 0.5, 0.5, 0.0, 1.0);

gl.drawArrays(gl.POINTS, 0, 1);
