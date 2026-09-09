import { useFrame } from '@react-three/fiber';
import { useRef, type MutableRefObject } from 'react';
import { DoubleSide, Group, MathUtils, MeshBasicMaterial, ShaderMaterial } from 'three';

interface SunProps {
  position: [number, number, number];
  /** 0 = night (dim), 1 = day (full) — driven by SpaceWorld theme lerp */
  dayMixRef: MutableRefObject<number>;
}

const Sun = ({ position, dayMixRef }: SunProps) => {
  const groupRef = useRef<Group>(null);
  const coreMatRef = useRef<ShaderMaterial>(null);
  const coronaMatRef = useRef<ShaderMaterial>(null);
  const glowMatRef = useRef<ShaderMaterial>(null);
  const haloMatRef = useRef<ShaderMaterial>(null);
  const flareMatRef = useRef<ShaderMaterial>(null);
  const coreSparkMatRef = useRef<MeshBasicMaterial>(null);
  const prominenceGroupRef = useRef<Group>(null);
  const prominenceMatsRef = useRef<(MeshBasicMaterial | null)[]>([]);

  useFrame((state, delta) => {
    const mix = dayMixRef.current;
    const t = state.clock.getElapsedTime();

    if (coreMatRef.current) {
      coreMatRef.current.uniforms.uTime.value = t;
      coreMatRef.current.uniforms.uMix.value = mix;
    }
    if (coronaMatRef.current) {
      coronaMatRef.current.uniforms.uTime.value = t;
      coronaMatRef.current.uniforms.uMix.value = mix;
    }
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uMix.value = mix;
    }
    if (haloMatRef.current) {
      haloMatRef.current.uniforms.uMix.value = mix;
    }
    if (flareMatRef.current) {
      flareMatRef.current.uniforms.uTime.value = t;
      flareMatRef.current.uniforms.uMix.value = mix;
    }
    if (coreSparkMatRef.current) {
      coreSparkMatRef.current.opacity = MathUtils.lerp(0, 0.55, mix);
    }

    prominenceMatsRef.current.forEach((mat, i) => {
      if (mat) {
        mat.opacity = MathUtils.lerp(0, 0.28 + (i % 2) * 0.1, mix);
      }
    });

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
    }

    if (prominenceGroupRef.current) {
      prominenceGroupRef.current.rotation.z -= delta * 0.07;
      prominenceGroupRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Core — granular plasma + limb darkening */}
      <mesh>
        <sphereGeometry args={[11.5, 64, 64]} />
        <shaderMaterial
          ref={coreMatRef}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uMix: { value: 0 }
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vLocalPos;
            varying vec3 vView;

            void main() {
              vLocalPos = position;
              vNormal = normalize(normalMatrix * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vView = normalize(cameraPosition - world.xyz);
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uMix;
            varying vec3 vNormal;
            varying vec3 vLocalPos;
            varying vec3 vView;

            float hash(vec3 p) {
              p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
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
              float n = fbm(p * 3.5 + vec3(uTime * 0.08, uTime * 0.05, 0.0));
              float hot = fbm(p * 7.0 - vec3(0.0, uTime * 0.12, uTime * 0.04));
              float spots = smoothstep(0.62, 0.82, fbm(p * 2.2 + 3.0));

              vec3 deep = vec3(0.75, 0.22, 0.02);
              vec3 mid = vec3(0.98, 0.55, 0.12);
              vec3 bright = vec3(1.0, 0.92, 0.55);
              vec3 white = vec3(1.0, 0.98, 0.9);

              vec3 color = mix(deep, mid, n);
              color = mix(color, bright, hot * 0.55);
              color = mix(color, white, pow(hot, 2.2) * 0.35);
              color = mix(color, deep * 0.55, spots * 0.55);

              float ndotv = max(dot(normalize(vNormal), normalize(vView)), 0.0);
              float limb = pow(ndotv, 0.55);
              color *= 0.45 + limb * 0.7;
              color = mix(color, bright, (1.0 - limb) * 0.15);

              gl_FragColor = vec4(color, mix(0.0, 1.0, uMix));
            }
          `}
        />
      </mesh>

      {/* Hot denser center */}
      <mesh scale={0.42}>
        <sphereGeometry args={[11.5, 24, 24]} />
        <meshBasicMaterial ref={coreSparkMatRef} color="#fff7ed" transparent opacity={0.02} depthWrite={false} />
      </mesh>

      {/* Inner corona */}
      <mesh scale={1.08}>
        <sphereGeometry args={[11.5, 48, 48]} />
        <shaderMaterial
          ref={coronaMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uMix: { value: 0 }
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            varying vec3 vLocalPos;

            void main() {
              vLocalPos = position;
              vNormal = normalize(normalMatrix * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vView = normalize(cameraPosition - world.xyz);
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uMix;
            varying vec3 vNormal;
            varying vec3 vView;
            varying vec3 vLocalPos;

            float hash(vec3 p) {
              p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
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

            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
              float boil = noise(normalize(vLocalPos) * 4.0 + vec3(uTime * 0.2, 0.0, uTime * 0.15));
              vec3 color = mix(vec3(1.0, 0.7, 0.25), vec3(1.0, 0.45, 0.08), boil);
              float alpha = fresnel * (0.18 + boil * 0.22) * mix(0.0, 1.0, uMix);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      {/* Outer soft glow */}
      <mesh scale={1.85}>
        <sphereGeometry args={[11.5, 40, 40]} />
        <shaderMaterial
          ref={glowMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          uniforms={{ uMix: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vView = normalize(cameraPosition - world.xyz);
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={`
            uniform float uMix;
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.4);
              vec3 color = mix(vec3(1.0, 0.75, 0.35), vec3(1.0, 0.5, 0.15), fresnel);
              gl_FragColor = vec4(color, fresnel * mix(0.0, 0.32, uMix));
            }
          `}
        />
      </mesh>

      {/* Distant halo */}
      <mesh scale={2.65}>
        <sphereGeometry args={[11.5, 32, 32]} />
        <shaderMaterial
          ref={haloMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          uniforms={{ uMix: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vec4 world = modelMatrix * vec4(position, 1.0);
              vView = normalize(cameraPosition - world.xyz);
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={`
            uniform float uMix;
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 4.5);
              gl_FragColor = vec4(1.0, 0.78, 0.4, fresnel * mix(0.0, 0.12, uMix));
            }
          `}
        />
      </mesh>

      {/* Radial flare disc */}
      <mesh rotation={[1.15, 0.35, 0.4]} scale={1.4}>
        <circleGeometry args={[22, 64]} />
        <shaderMaterial
          ref={flareMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uMix: { value: 0 }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uMix;
            varying vec2 vUv;

            void main() {
              vec2 centered = vUv - 0.5;
              float dist = length(centered) * 2.0;
              float angle = atan(centered.y, centered.x);
              float rays = pow(abs(sin(angle * 10.0 + uTime * 0.3)), 5.0);
              float disc = smoothstep(0.42, 0.55, dist) * (1.0 - smoothstep(0.72, 1.0, dist));
              float alpha = rays * disc * mix(0.0, 0.2, uMix);
              vec3 color = mix(vec3(1.0, 0.85, 0.4), vec3(1.0, 0.4, 0.08), rays);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      {/* Prominence loops */}
      <group ref={prominenceGroupRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const tilt = 0.35 + (i % 2) * 0.25;
          return (
            <mesh
              key={`prominence-${i}`}
              position={[Math.cos(angle) * 11.8, Math.sin(angle * 1.3) * 2.5, Math.sin(angle) * 11.8]}
              rotation={[tilt, angle, 0.4]}
            >
              <torusGeometry args={[2.8 + i * 0.35, 0.22, 8, 32, Math.PI * 0.85]} />
              <meshBasicMaterial
                ref={(mat) => {
                  prominenceMatsRef.current[i] = mat;
                }}
                color={i % 2 === 0 ? '#fb923c' : '#fbbf24'}
                transparent
                opacity={0.01}
                depthWrite={false}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export default Sun;
