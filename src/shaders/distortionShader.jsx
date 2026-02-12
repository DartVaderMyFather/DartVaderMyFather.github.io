//DistortionShader- шейдер искажения сетки плейна. Можно использовать текстуру.

export const vertex =/* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float uIntensity;
uniform float uWaveHeight;

void main() {
  vUv = uv;
  
  // Волновой дисторшн (вершинный)
  float wave = sin(position.x * 5.0 + uTime) * uIntensity * uWaveHeight;
  vec3 newPosition = position;
  newPosition.z += wave;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

export const fragment = /* glsl */`
varying vec2 vUv;
uniform float uTime;
uniform float uIntensity;
uniform sampler2D uTexture;
uniform float uSpeed;
uniform float uTextureIntensity; // Как сильно показывать текстуру


void main() {
  vec2 uv = vUv;
  
  // Искажение UV координат
  uv.x += sin(uv.y * 10.0 + uTime * uSpeed) * 0.1 * uIntensity;
  uv.y += cos(uv.x * 8.0 + uTime * uSpeed * 0.8) * 0.05 * uIntensity;
  
  // Читаем цвет из текстуры
  vec4 textureColor = texture2D(uTexture, uv);
  

  
  gl_FragColor = textureColor;
}
`