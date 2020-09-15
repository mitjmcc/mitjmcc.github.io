#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress;
uniform vec2 u_mouse;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

float _Columns = 96.0;
float _Rows = 96.0;
float _ColorDepth = 8.0;

float round(float a)
{
    return floor(a + 0.5);
}

mat2 rotate2d(float angle)
{
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float x = u_mouse.x / u_resolution.x;

    // Lower resolution by rounding UV coordinates to nearest multiple of _Columns x _Rows
    uv.x *= _Columns;
    uv.y *= _Rows;
    uv.x = round(uv.x);
    uv.y = round(uv.y);
    uv.x /= _Columns;
    uv.y /= _Rows;

    vec2 uv_rotated = uv;
    uv_rotated -= .5;
    uv_rotated.y /= u_resolution.x / u_resolution.y;
    uv_rotated *= rotate2d(x * PI / 2.0);
    uv_rotated.y *= u_resolution.x / u_resolution.y;
    uv_rotated += .5;

    // Sample black and white texture to determine which areas are transitioned first
    vec4 mask = texture2D(u_tex1, uv_rotated );

    // Sample the video
    vec4 col = texture2D(u_tex0, uv);

    // Lower color precision
    col = floor(col * _ColorDepth) / _ColorDepth;

    // Cutoff output values by grayscale mask value
    if (x <= 0.0)
        gl_FragColor = col;
    else if (x < mask.g - 0.1)
        gl_FragColor = col;
    else
        gl_FragColor = vec4(0.0);
}
