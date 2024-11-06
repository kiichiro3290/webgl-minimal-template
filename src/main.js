import vsSource from './vertex.glsl?raw';
import fsSource from './fragment.glsl?raw';

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

main();

function main() {
  const canvas = document.getElementById('glcanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl2');
  const program = initShaderProgram(gl, vsSource, fsSource);
  gl.useProgram(program);

  // 頂点データとインデックスの設定
  const vertices = new Float32Array([
      -1.0,  1.0,  0.0,  0.0,  // 上左
      -1.0, -1.0,  0.0,  1.0,  // 下左
      1.0,  1.0,  1.0,  0.0,  // 上右
      1.0, -1.0,  1.0,  1.0,  // 下右
  ]);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 頂点属性のリンク
  const positionAttribLocation = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(positionAttribLocation);

  const texcoordAttribLocation = gl.getAttribLocation(program, "a_texcoord");
  gl.vertexAttribPointer(texcoordAttribLocation, 2, gl.FLOAT, false, 16, 8);
  gl.enableVertexAttribArray(texcoordAttribLocation);

  // フレームの描画
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}