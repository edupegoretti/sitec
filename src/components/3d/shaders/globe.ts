// Vertex shader for globe dots
export const dotVertexShader = `
  attribute float size;
  attribute float alpha;
  attribute float phase;

  varying float vAlpha;
  varying float vPhase;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vAlpha = alpha;
    vPhase = phase;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Size attenuation
    gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for globe dots with twinkling effect
export const dotFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uColorSecondary;

  varying float vAlpha;
  varying float vPhase;

  void main() {
    // Create circular point
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Discard pixels outside circle
    if (dist > 0.5) discard;

    // Soft edge
    float edge = 1.0 - smoothstep(0.3, 0.5, dist);

    // Twinkling effect using sine wave with phase offset
    float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + vPhase * 6.28318);

    // Mix colors based on phase
    vec3 color = mix(uColor, uColorSecondary, sin(vPhase * 3.14159) * 0.3 + 0.5);

    gl_FragColor = vec4(color, vAlpha * edge * twinkle);
  }
`;

// Atmosphere glow shader
export const atmosphereVertexShader = `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(uColor, intensity * uIntensity);
  }
`;
