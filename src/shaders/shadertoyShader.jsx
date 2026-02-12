//ShaderToyShader- импорт шейдера из https://www.shadertoy.com/view/mtyGWy
//https://www.youtube.com/watch?v=f4s1h2YETNY&t=3s




export const vertex = /* glsl */`
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

void main() {

    vUv = uv;     
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}`




export const fragment = /* glsl */`
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

vec3 palette( in float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.1, 0.2, 0.3);

    return a + b*cos( 6.283185*(c*t+d) );
}

void main() {

     // Преобразуем uv в координаты Shadertoy
    vec2 fragCoord = vUv * iResolution.xy;
    
    // Теперь используем Shadertoy координаты
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.xy;
    vec2 uv0 = uv;    
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 3.0; i++){
        uv = fract(uv * 1.5) - 0.5;
        
        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + iTime*.4);  
        
        d = sin(d*8. + iTime)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.3); //power function контраст
        
        finalColor += col * d;
    }
    
    //fragColor --> gl_FragColor 
    gl_FragColor = vec4(finalColor,1.0);
}
`