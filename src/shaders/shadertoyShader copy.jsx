//ShaderToyShader- импорт шейдера из https://www.shadertoy.com/view/mtyGWy




export const vertex = /* glsl */`
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

void main() {

    vUv = uv;     
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}`




export const fragment = /* glsl */`

void main() {
    vec4 color = vec4(vec3(0,1,1),1.0);        
    gl_FragColor = color;
}
`