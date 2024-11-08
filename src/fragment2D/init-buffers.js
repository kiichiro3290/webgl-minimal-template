function initBuffers(gl) {
  // 頂点データ回りの初期化
  // 正方形の4つの頂点を定義
  const position = [
    -1.0,  1.0,  0.0, // left-top(x, y, z)
    1.0,  1.0,  0.0, // right-top(x, y, z)
    -1.0, -1.0,  0.0, // left-bottom(x, y, z)
    1.0, -1.0,  0.0  // right-bottom(x, y, z)
  ];
  const color = [
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0, // blue
  ];
  const index = [
    0, 2, 1,
    1, 2, 3,
  ]

  const positionBuffer = createVBO(gl, position);
  const colorBuffer = createVBO(gl, color);
  const indexBuffer = createIBO(gl, index);

  return {
    position: positionBuffer,
    color: colorBuffer,
    index: indexBuffer,
  };
}

function createVBO(gl, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return buffer;
}

function createIBO (gl, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return buffer;
}

export { initBuffers, createVBO, createIBO };