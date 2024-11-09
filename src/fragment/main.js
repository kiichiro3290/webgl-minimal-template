import vsSource from './vertex.glsl?raw';
import fsSource from './fragment.glsl?raw';

import { initShaderProgram } from "./utils.js";
import { initBuffers, createIBO } from "./init-buffers.js";

var startTime;
var time = 0.0;
var tempTime = 0.0;
var fps = 1000 / 30;
var mx = 0.5;
var my = 0.5;

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

// レンダリングを行う関数
function render(gl, programInfo, buffers) {    
    // 時間管理
    time = (new Date().getTime() - startTime) * 0.001;
    
    // カラーバッファをクリア
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // uniform 関連
    gl.uniform1f(programInfo.uniformLocations.time, time + tempTime);
    gl.uniform2fv(programInfo.uniformLocations.mouse, [mx, my]);
    gl.uniform2fv(programInfo.uniformLocations.resolution, [canvasWidth, canvasHeight]);
    
    // 描画
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    
    // 再帰
    setTimeout(() => {
      render(gl, programInfo, buffers);
    }, fps);
}

// mouse
function mouseMove(e){
    mx = e.offsetX / canvasWidth;
    my = e.offsetY / canvasHeight;
}

function main() {
  // キャンバスの取得
  const canvas = document.querySelector("#glcanvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // イベントリスナー登録
  canvas.addEventListener('mousemove', mouseMove, true);
  canvas.addEventListener('fullscreenchange', () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  });

  // WebGLコンテキストの取得
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // シェーダープログラムの初期化
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      position: gl.getAttribLocation(shaderProgram, "position"),
    },
    uniformLocations: {
      time: gl.getUniformLocation(shaderProgram, "time"),
      resolution: gl.getUniformLocation(shaderProgram, "resolution"),
      mouse: gl.getUniformLocation(shaderProgram, "mouse"),
    },
  };

  // バッファの初期化
  const buffers = initBuffers(gl);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.enableVertexAttribArray(programInfo.attribLocations.position);
  gl.vertexAttribPointer(programInfo.attribLocations.position, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  // その他の初期化
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  startTime = new Date().getTime();

  gl.useProgram(shaderProgram);

  render(gl, programInfo, buffers);
}

window.onload = main();