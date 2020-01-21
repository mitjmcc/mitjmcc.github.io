#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    float u = gl_FragCoord.x / u_resolution.x;
    float v = gl_FragCoord.y / u_resolution.y;

    vec3 color1 = vec3(1.0,0.0,0.0);
    vec3 color2 = vec3(0.0,0.9,0.0);
    vec3 color3 = vec3(0.0,0.0,1.0);
    vec3 color4 = vec3(0.9,0.0,0.9);
    vec3 gradient = mix(mix(color1, color2, u), mix(color3, color4, u), v);
    gl_FragColor = vec4(gradient,1.0);
}
