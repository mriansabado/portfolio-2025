import { useFrame } from '@react-three/fiber';
import { useRef, type MutableRefObject } from 'react';
import { AdditiveBlending, DoubleSide, Group, ShaderMaterial } from 'three';

interface BlackHoleProps {
  position: [number, number, number];
  /** 0 = night (full hole), 1 = day (hidden) — same theme mix as Sun */
  dayMixRef: MutableRefObject<number>;
}

const CORE_RADIUS = 11.5;

const BlackHole = ({ position, dayMixRef }: BlackHoleProps) => {
  const groupRef = useRef<Group>(null);
  const diskGroupRef = useRef<Group>(null);
  const horizonMatRef = useRef<ShaderMaterial>(null);
  const photonMatRef = useRef<ShaderMaterial>(null);
  const diskMatRef = useRef<ShaderMaterial>(null);
  const glowMatRef = useRef<ShaderMaterial>(null);
  const jetsMatRef = useRef<ShaderMaterial>(null);

  useFrame((state, delta) => {
    const night = 1 - dayMixRef.current;
    const t = state.clock.getElapsedTime();

    if (horizonMatRef.current) {
      horizonMatRef.current.uniforms.uTime.value = t;
      horizonMatRef.current.uniforms.uMix.value = night;
    }
    if (photonMatRef.current) {
      photonMatRef.current.uniforms.uTime.value = t;
      photonMatRef.current.uniforms.uMix.value = night;
    }
    if (diskMatRef.current) {
      diskMatRef.current.uniforms.uTime.value = t;
      diskMatRef.current.uniforms.uMix.value = night;
    }
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uMix.value = night;
    }
    if (jetsMatRef.current) {
      jetsMatRef.current.uniforms.uTime.value = t;
      jetsMatRef.current.uniforms.uMix.value = night;
    }

    if (diskGroupRef.current) {
      diskGroupRef.current.rotation.z += delta * 0.08;
      diskGroupRef.current.rotation.y += delta * 0.025;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Event horizon — near-black void */}
      <mesh>
        <sphereGeometry args={[CORE_RADIUS, 64, 64]} />
        <shaderMaterial
          ref={horizonMatRef}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uMix: { value: 0 }
          }}
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
              float ndotv = max(dot(normalize(vNormal), normalize(vView)), 0.0);
              float rim = pow(1.0 - ndotv, 3.2);
              vec3 voidColor = vec3(0.01, 0.012, 0.03);
              vec3 rimColor = vec3(0.35, 0.22, 0.55);
              vec3 color = mix(voidColor, rimColor, rim * 0.55);
              float alpha = mix(0.02, 0.98, uMix);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      {/* Photon ring */}
      <mesh scale={1.04}>
        <sphereGeometry args={[CORE_RADIUS, 48, 48]} />
        <shaderMaterial
          ref={photonMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
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
            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.8);
              float band = abs(normalize(vLocalPos).y);
              float equator = smoothstep(0.55, 0.05, band);
              float pulse = 0.75 + 0.25 * sin(uTime * 1.4 + band * 8.0);
              vec3 color = mix(vec3(0.55, 0.35, 1.0), vec3(0.95, 0.7, 1.0), fresnel);
              float alpha = fresnel * (0.35 + equator * 0.55) * pulse * mix(0.01, 1.0, uMix);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      {/* Accretion disk */}
      <group ref={diskGroupRef} rotation={[1.15, 0.2, 0.15]}>
        <mesh>
          <ringGeometry args={[CORE_RADIUS * 1.08, CORE_RADIUS * 2.35, 96]} />
          <shaderMaterial
            ref={diskMatRef}
            transparent
            depthWrite={false}
            side={DoubleSide}
            blending={AdditiveBlending}
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

              float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
              }

              float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                  mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                  mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
                  f.y
                );
              }

              void main() {
                vec2 centered = vUv - 0.5;
                float dist = length(centered) * 2.0;
                float angle = atan(centered.y, centered.x);
                float spiral = noise(vec2(angle * 2.2 - uTime * 0.55, dist * 4.5 - uTime * 0.35));
                float arms = pow(abs(sin(angle * 3.0 - dist * 6.0 + uTime * 0.7)), 2.4);
                float ring = smoothstep(0.42, 0.55, dist) * (1.0 - smoothstep(0.78, 1.05, dist));
                float hot = smoothstep(0.85, 0.5, dist);

                vec3 outer = vec3(0.25, 0.2, 0.65);
                vec3 mid = vec3(0.55, 0.35, 0.95);
                vec3 inner = vec3(0.95, 0.75, 1.0);
                vec3 color = mix(outer, mid, spiral);
                color = mix(color, inner, hot * 0.75 + arms * 0.25);

                float alpha = ring * (0.22 + spiral * 0.45 + arms * 0.2) * mix(0.01, 1.0, uMix);
                gl_FragColor = vec4(color, alpha);
              }
            `}
          />
        </mesh>
      </group>

      {/* Soft gravitational glow */}
      <mesh scale={2.2}>
        <sphereGeometry args={[CORE_RADIUS, 32, 32]} />
        <shaderMaterial
          ref={glowMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
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
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.8);
              vec3 color = mix(vec3(0.2, 0.15, 0.45), vec3(0.55, 0.4, 0.9), fresnel);
              gl_FragColor = vec4(color, fresnel * mix(0.005, 0.22, uMix));
            }
          `}
        />
      </mesh>

      {/* Polar jets — subtle beams */}
      <mesh>
        <cylinderGeometry args={[0.35, 1.8, CORE_RADIUS * 4.2, 16, 1, true]} />
        <shaderMaterial
          ref={jetsMatRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
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
              float along = abs(vUv.y - 0.5) * 2.0;
              float pulse = 0.65 + 0.35 * sin(uTime * 2.2 + along * 10.0);
              float core = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 2.5);
              float fade = 1.0 - smoothstep(0.15, 1.0, along);
              vec3 color = mix(vec3(0.45, 0.35, 0.95), vec3(0.85, 0.75, 1.0), core);
              float alpha = core * fade * pulse * mix(0.0, 0.28, uMix);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>
    </group>
  );
};

export default BlackHole;
