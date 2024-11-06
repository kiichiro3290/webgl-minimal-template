#version 300 es
precision mediump float;

in vec2 v_texcoord; // 頂点シェーダーから渡されたテクスチャ座標
out vec4 fragColor; // 最終的なピクセル色

void main() {
    // 左側の青を強くした青紫色と赤紫色のカラー配色
    vec3 color1 = vec3(0, 0.5, 1.0); // より強い青紫色 (青を強調)
    vec3 color2 = vec3(1.0, 0, 0.8); // より明るい赤紫色

    // テクスチャ座標に基づき、左右で色を補間する
    // v_texcoord.x が 0 で強調された青紫色、1 で赤紫色
    vec3 color = mix(color1, color2, v_texcoord.x);

    // 最終的なフラグメント色
    fragColor = vec4(color, 1.0);
}
