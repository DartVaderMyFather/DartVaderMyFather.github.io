//ShaderToyShader- импорт шейдера из https://www.shadertoy.com/view/wfGSWW





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



void main() {
    // Преобразуем координаты vUv в координаты Shadertoy
    // В Shadertoy: u = (fragCoord * 2.0 - iResolution.xy) / iResolution.y
    // где fragCoord = gl_FragCoord.xy
    
    // Эмулируем fragCoord из vUv
    vec2 fragCoord = vUv * iResolution;
    
    // Координаты как в Shadertoy
    vec2 u = (fragCoord * 2.0 - iResolution) / iResolution.y;
    
    // Инициализация переменных
    float i, a, d, s, t = iTime * 0.3;
    vec3 p = vec3(iResolution, 0.0); // Преобразуем vec2 в vec3
    
    // Проверка по Y координате
    if (abs(u.y) > 1.0) {
        gl_FragColor = vec4(0.0);
        return;
    }
    
    // Инициализируем выходной цвет
    vec4 o = vec4(0.0);
    
    // Основной цикл
    for(i = 0.0; i < 128.0; i++) {
        p = vec3(u * d, d + t / 0.1);
        s = 8.0 + p.y + p.x;
        
        // Внутренний цикл
        for (a = 0.01; a < 1.0; a += a) {
            p += cos(t - p.yzx) * 0.2;
            s -= abs(dot(sin(t + t - 0.2 * p.z + 0.3 * p / a), vec3(a + a)));
        }
        
        d += s = 0.1 + abs(s) * 0.1;
        o += vec4(4.0, 2.0, 1.0, 0.0) / s + 0.1 * vec4(4.0, 2.0, 1.0, 0.0) / abs(u.y + u.x);
    }
    
    // Финальное преобразование
    vec2 u_offset = u - vec2(0.5, 0.3);
    o = tanh(o / 1000.0 / length(u_offset));
    
    // Присваиваем выходной цвет
    gl_FragColor = vec4(o.rgb, 1.0);
}
`
/*
void mainImage(out vec4 o, vec2 u) {
    float i,a,d,s,t=iTime*.3;
    vec3  p = iResolution;    
    u = (u+u-p.xy)/p.y;
    if (abs(u.y) > .8) { o*= i; return;}
    for(o*=i; i++<128.; ) {
        p = vec3(u * d, d+t/.1);
        s = 8.+p.y+p.x;
        for (a = .01; a < 1.; a += a)
            p += cos(t-p.yzx)*.2,
            s -= abs(dot(sin(t+t-.2*p.z+.3*p / a), vec3(a+a)));
        d += s = .1 + abs(s)*.1;
        o +=  vec4(4,2,1,0)/s + .1*vec4(4,2,1,0)/abs(u.y+u.x);
    }
    o = tanh(o /1e3 / length(u -= vec2(.5, .3)) + .1*dot(u,u));
}*/