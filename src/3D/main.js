import vsSource from './vertex.glsl?raw';
import fsSource from './fragment.glsl?raw';

import { initBuffers } from "./init-buffers.js";
import { initShaderProgram } from "./init-shader.js";

let cubeRotation = 0.0;
let cnt = 0;

const modelMatrix = mat4.create();
const viewMatrix = mat4.create();
const projectionMatrix = mat4.create();
const tmpMatrix = mat4.create();
const mvpMatrix = mat4.create();

main();

function main() {
  // WebGL コンテキストの取得
  const canvas = document.querySelector("#glcanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // 画面をクリア
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // シェーダープログラムの初期化
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  gl.useProgram(shaderProgram);

  // シェーダー変数との関連付け
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      position: gl.getAttribLocation(shaderProgram, "position"),
      color: gl.getAttribLocation(shaderProgram, "color"),
    },
    uniformLocations: {
      mvpMatrix: gl.getUniformLocation(
        shaderProgram,
        "mvpMatrix"
      ),
    },
  };

  // バッファオブジェクトの初期化
  const buffers = initBuffers(gl);

  // 位置情報のバインドと登録
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.enableVertexAttribArray(programInfo.attribLocations.position);
  const size = 3;
  gl.vertexAttribPointer(
    programInfo.attribLocations.position,
    size,
    gl.FLOAT,
    false,
    0,
    0
  );

  // 色情報のバインドと登録
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.enableVertexAttribArray(programInfo.attribLocations.color);
  const colorSize = 4;
  gl.vertexAttribPointer(
    programInfo.attribLocations.color,
    colorSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  // インデックスバッファのバインド
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  // ビュー座標変換行列(カメラの座標変換)
  mat4.lookAt(viewMatrix, [0, 1.0, 5.0], [0, 0, 0], [0, 1, 0]);
  // プロジェクション座標変換行列
  const zFar = 100;
  const aspect = gl.canvas.width / gl.canvas.height
  mat4.perspective(projectionMatrix, 90, aspect, 0.1, zFar);
  mat4.multiply(tmpMatrix, projectionMatrix, viewMatrix);

  drawScene(gl, programInfo);

  function render() {
    cnt++;

    drawScene(gl, programInfo, buffers, cubeRotation);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function drawScene(gl, programInfo) {
  // canvasを初期化
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // カウンタを元にラジアンを算出
  const rad = ((cnt % 360) * Math.PI) / 180;

  mat4.identity(modelMatrix);
  mat4.rotate(modelMatrix, modelMatrix, rad, [0, 1, 0]);
  mat4.multiply(mvpMatrix, tmpMatrix, modelMatrix);
  // レンダリング
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.mvpMatrix,
    false,
    mvpMatrix
  );

  // 描画
  const indexCount = 6;
  gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

  gl.flush();
}