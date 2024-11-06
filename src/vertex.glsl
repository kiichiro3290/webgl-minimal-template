#version 300 es
in vec4 a_position; // 頂点の位置
in vec2 a_texcoord; // テクスチャ座標

out vec2 v_texcoord; // フラグメントシェーダーへ渡すテクスチャ座標

void main() {
    gl_Position = a_position; // 頂点位置をそのままセット
    v_texcoord = a_texcoord; // テクスチャ座標をフラグメントシェーダーへ渡す
}
