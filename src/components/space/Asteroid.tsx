import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, Group, Mesh, ShaderMaterial, Vector3 } from 'three';

export interface AsteroidVisual {
  id: string;
  position: Vector3;
  radius: number;
  rotationSeed: number;
  tint: string;
  accent: string;
  spin: [number, number, number];
  stretch: [number, number, number];
  detail: number;
}

interface AsteroidProps {
  asteroid: AsteroidVisual;
}

const Asteroid = ({ asteroid }: AsteroidProps) => {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const baseColor = useMemo(() => new Color(asteroid.tint), [asteroid.tint]);
  const accentColor = useMemo(() => new Color(asteroid.accent), [asteroid.accent]);
  const darkColor = useMemo(() => new Color(asteroid.tint).offsetHSL(0, -0.04, -0.22), [asteroid.tint]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += asteroid.spin[0] * delta;
      groupRef.current.rotation.y += asteroid.spin[1] * delta;
      groupRef.current.rotation.z += asteroid.spin[2] * delta;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <group position={[asteroid.position.x, asteroid.position.y, asteroid.position.z]}>
      <group
        ref={groupRef}
        rotation={[asteroid.rotationSeed, asteroid.rotationSeed * 0.62, asteroid.rotationSeed * 0.31]}
        scale={asteroid.stretch}
      >
        {/* Main rocky body */}
        <mesh ref={bodyRef}>
          <icosahedronGeometry args={[asteroid.radius, 2]} />
          <shaderMaterial
            ref={materialRef}
            uniforms={{
              uTime: { value: 0 },
              uBase: { value: baseColor },
              uDark: { value: darkColor },
              uAccent: { value: accentColor },
              uDetail: { value: asteroid.detail },
              uSeed: { value: asteroid.rotationSeed }
            }}
            vertexShader={`
              uniform float uDetail;
              uniform float uSeed;
              varying vec3 vLocalPos;
              varying vec3 vNormal;
              varying float vCrater;

              float hash(vec3 p) {
                p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3) + uSeed);
                p *= 17.0;
                return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
              }

              float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                  mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
                  f.z
                );
              }

              float fbm(vec3 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 4; i++) {
                  v += a * noise(p);
                  p *= 2.05;
                  a *= 0.5;
                }
                return v;
              }

              void main() {
                vec3 n = normalize(position);
                float lump = fbm(n * (2.2 + uDetail) + uSeed) * 2.0 - 1.0;
                float crater = smoothstep(0.55, 0.82, fbm(n * (3.4 + uDetail * 0.6) + 4.2));
                float displace = lump * 0.14 - crater * 0.11;
                vec3 displaced = position + n * displace * length(position);

                vLocalPos = displaced;
                vNormal = normalize(normalMatrix * normal);
                vCrater = crater;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
              }
            `}
            fragmentShader={`
              uniform vec3 uBase;
              uniform vec3 uDark;
              uniform vec3 uAccent;
              uniform float uDetail;
              uniform float uSeed;
              uniform float uTime;
              varying vec3 vLocalPos;
              varying vec3 vNormal;
              varying float vCrater;

              float hash(vec3 p) {
                p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3) + uSeed);
                p *= 17.0;
                return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
              }

              float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                  mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
                  f.z
                );
              }

              float fbm(vec3 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 5; i++) {
                  v += a * noise(p);
                  p *= 2.1;
                  a *= 0.5;
                }
                return v;
              }

              void main() {
                vec3 p = normalize(vLocalPos);
                float grain = fbm(p * (5.5 + uDetail) + uSeed);
                float veins = smoothstep(0.62, 0.78, fbm(p * 7.5 - uSeed + uTime * 0.02));
                vec3 n = normalize(vNormal);
                float light = clamp(dot(n, normalize(vec3(0.45, 0.85, 0.35))), 0.0, 1.0);
                float fill = clamp(dot(n, normalize(vec3(-0.35, 0.2, -0.6))), 0.0, 1.0) * 0.35;
                float rim = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.4);

                vec3 color = mix(uDark, uBase, grain);
                color = mix(color, uAccent, veins * 0.45);
                color = mix(color, uDark * 0.5, vCrater * 0.75);
                color *= 0.42 + light * 0.7 + fill;
                color += uAccent * veins * (0.06 + light * 0.05);
                color += vec3(0.12, 0.14, 0.18) * rim * 0.25;

                gl_FragColor = vec4(color, 1.0);
              }
            `}
          />
        </mesh>

        {/* Surface boulder / outcrop accents */}
        {[0, 1, 2].map((i) => {
          const angle = asteroid.rotationSeed + (i / 3) * Math.PI * 2;
          const lift = asteroid.radius * (0.72 + (i % 2) * 0.12);
          const size = asteroid.radius * (0.18 + (i % 3) * 0.06);
          return (
            <mesh
              key={`${asteroid.id}-bump-${i}`}
              position={[Math.cos(angle) * lift * 0.55, Math.sin(angle * 1.3) * lift * 0.35, Math.sin(angle) * lift * 0.55]}
              rotation={[angle * 0.4, angle, angle * 0.2]}
              scale={[1 + (i % 2) * 0.35, 0.7, 1.15]}
            >
              <dodecahedronGeometry args={[size, 0]} />
              <meshStandardMaterial color={asteroid.accent} roughness={0.96} metalness={0.12} />
            </mesh>
          );
        })}

        {/* Mineral fleck */}
        <mesh
          position={[
            Math.cos(asteroid.rotationSeed * 2.1) * asteroid.radius * 0.62,
            Math.sin(asteroid.rotationSeed) * asteroid.radius * 0.28,
            Math.sin(asteroid.rotationSeed * 2.1) * asteroid.radius * 0.62
          ]}
          scale={asteroid.radius * 0.22}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={asteroid.accent} roughness={0.35} metalness={0.72} emissive={asteroid.accent} emissiveIntensity={0.12} />
        </mesh>
      </group>
    </group>
  );
};

export default Asteroid;
