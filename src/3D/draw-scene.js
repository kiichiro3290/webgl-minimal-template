function drawScene(gl, programInfo, buffers, cubeRotation) {
  // 画面のクリア
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const modelMatrix = mat4.create();
  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();
  const mvpMatrix = mat4.create();

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix); // pにvを掛ける
  mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix); // pvにmを掛ける

  // 平行移動
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]
  ); // amount to translate

  // setPositionAttribute(gl, buffers, programInfo);
  // setColorAttribute(gl, buffers, programInfo);

  // // Tell WebGL which indices to use to index the vertices
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // // Tell WebGL to use our program when drawing
  // gl.useProgram(programInfo.program);

  // // Set the shader uniforms
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.projectionMatrix,
  //   false,
  //   projectionMatrix
  // );
  // gl.uniformMatrix4fv(
  //   programInfo.uniformLocations.modelViewMatrix,
  //   false,
  //   modelViewMatrix
  // );

  // {
  //   const vertexCount = 36;
  //   const type = gl.UNSIGNED_SHORT;
  //   const offset = 0;
  //   gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  // }
}


function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 3;
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(gl, buffers, programInfo) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };