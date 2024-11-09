function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);
  const indexBuffer = initIndexBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
    index: indexBuffer
  };
}

function createVbo(gl, data) {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
}

function createIbo(gl, data) {
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
}

// 三角形の頂点情報に関する配列
const trianglePosition = [
  0.0, 1.0, 0.0,
  1.0, 0.0, 0.0,
  -1.0, 0.0, 0.0
];

// 四角形の頂点情報に関する配列
const squarePosition = [
  0.0,  1.0,  0.0,
  1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  0.0, -1.0,  0.0
];

function initPositionBuffer(gl) {
  const positionBuffer = createVbo(gl, squarePosition);

  return positionBuffer;
}

// 色情報に関する配列(頂点数x4)
const vertexColor = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
];

function initColorBuffer(gl) {
  const colorBuffer = createVbo(gl, vertexColor);

  return colorBuffer;
}

const index = [
  0, 1, 2,
  1, 2, 3
]

function initIndexBuffer(gl) {
  const indexBuffer = createIbo(gl, index);

  return indexBuffer;
}

export { initBuffers };