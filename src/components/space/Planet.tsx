import { Html } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Color, DoubleSide, Group, Mesh, ShaderMaterial } from 'three';
import type { PlanetDefinition, PlanetId } from '../../data/planets';

interface PlanetProps {
  planet: PlanetDefinition;
  isNearest: boolean;
  shotPulse: number;
  showLabel: boolean;
  canSelect: boolean;
  onSelect: (id: PlanetDefinition['id']) => void;
}

/** 0 rocky · 1 gas · 2 ice · 3 terra */
const PLANET_STYLE: Record<PlanetId, number> = {
  projects: 0,
  about: 1,
  resume: 2,
  contact: 3
};

const Planet = ({ planet, isNearest, shotPulse, showLabel, canSelect, onSelect }: PlanetProps) => {
  const glowScale = planet.radius * (isNearest ? 1.72 : 1.38);
  const bodyRef = useRef<Mesh>(null);
  const bodyMaterialRef = useRef<ShaderMaterial>(null);
  const atmosphereMaterialRef = useRef<ShaderMaterial>(null);
  const ringRef = useRef<Mesh>(null);
  const outerRingRef = useRef<Mesh>(null);
  const accentGroupRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);
  const cloudsMaterialRef = useRef<ShaderMaterial>(null);

  const baseColor = useMemo(() => new Color(planet.color), [planet.color]);
  const accentColor = useMemo(() => new Color(planet.accent), [planet.accent]);
  const darkColor = useMemo(() => new Color(planet.color).offsetHSL(0, -0.05, -0.32), [planet.color]);
  const landColor = useMemo(() => new Color(planet.land ?? planet.accent), [planet.land, planet.accent]);
  const shotBaseColor = useMemo(() => new Color(planet.accent).offsetHSL(0.08, 0.18, 0.05), [planet.accent]);
  const shotAccentColor = useMemo(() => new Color(planet.color).offsetHSL(-0.08, 0.18, 0.18), [planet.color]);
  const shotEnergyRef = useRef(0);
  const style = PLANET_STYLE[planet.id];

  useEffect(() => {
    if (shotPulse > 0) {
      shotEnergyRef.current = 1;
    }
  }, [shotPulse]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    shotEnergyRef.current = Math.max(0, shotEnergyRef.current - delta * 1.6);

    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * (style === 1 ? 0.12 : 0.16);
    }

    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.uniforms.uTime.value = elapsed;
      bodyMaterialRef.current.uniforms.uActive.value = isNearest ? 1 : 0;
      bodyMaterialRef.current.uniforms.uShot.value = shotEnergyRef.current;
    }

    if (atmosphereMaterialRef.current) {
      atmosphereMaterialRef.current.uniforms.uActive.value = isNearest ? 1 : 0;
      atmosphereMaterialRef.current.uniforms.uShot.value = shotEnergyRef.current;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.08;
    }

    if (cloudsMaterialRef.current) {
      cloudsMaterialRef.current.uniforms.uTime.value = elapsed;
    }

    if (atmosphereRef.current) {
      const targetScale = glowScale * (1 + Math.sin(elapsed * 1.2) * 0.015);
      atmosphereRef.current.scale.setScalar(targetScale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.04;
    }

    if (accentGroupRef.current) {
      accentGroupRef.current.rotation.y += delta * (0.28 + planet.radius * 0.03);
    }

    if (pulseRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.18;
      pulseRef.current.scale.setScalar(pulse);
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!canSelect) {
      return;
    }
    onSelect(planet.id);
  };

  const showMainRing = planet.id === 'about' || planet.id === 'projects';
  const showClouds = planet.id === 'contact' || planet.id === 'resume';

  return (
    <group position={planet.position}>
      <mesh ref={bodyRef} onClick={handleClick}>
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <shaderMaterial
          ref={bodyMaterialRef}
          uniforms={{
            uTime: { value: 0 },
            uBase: { value: baseColor },
            uAccent: { value: accentColor },
            uDark: { value: darkColor },
            uLand: { value: landColor },
            uShotBase: { value: shotBaseColor },
            uShotAccent: { value: shotAccentColor },
            uShot: { value: 0 },
            uActive: { value: isNearest ? 1 : 0 },
            uStyle: { value: style }
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vLocalPos;

            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              vLocalPos = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uActive;
            uniform float uShot;
            uniform float uStyle;
            uniform vec3 uBase;
            uniform vec3 uAccent;
            uniform vec3 uDark;
            uniform vec3 uLand;
            uniform vec3 uShotBase;
            uniform vec3 uShotAccent;

            varying vec2 vUv;
            varying vec3 vNormal;
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

            float fbm(vec3 p) {
              float v = 0.0;
              float a = 0.5;
              for (int i = 0; i < 5; i++) {
                v += a * noise(p);
                p *= 2.05;
                a *= 0.5;
              }
              return v;
            }

            void main() {
              vec3 n = normalize(vNormal);
              vec3 p = normalize(vLocalPos);
              float lat = p.y;
              vec3 color = uBase;

              if (uStyle < 0.5) {
                // Rocky / Mars-like continents
                float continents = fbm(p * 3.2);
                float craters = smoothstep(0.55, 0.75, fbm(p * 8.5));
                float poles = smoothstep(0.72, 0.92, abs(lat));
                color = mix(uDark, uBase, 0.45 + continents * 0.55);
                color = mix(color, uLand, smoothstep(0.42, 0.68, continents) * 0.55);
                color = mix(color, uDark * 0.7, craters * 0.35);
                color = mix(color, vec3(0.92, 0.9, 0.86), poles * 0.55);
              } else if (uStyle < 1.5) {
                // Gas giant bands
                float bands = sin(lat * 18.0 + fbm(p * 2.5 + vec3(uTime * 0.02, 0.0, 0.0)) * 2.2);
                float storm = smoothstep(0.62, 0.85, fbm(p * 4.0 + vec3(uTime * 0.03, 0.0, 0.0)));
                color = mix(uDark, uBase, 0.5 + bands * 0.35);
                color = mix(color, uAccent, (0.5 + 0.5 * bands) * 0.28);
                color = mix(color, uLand, storm * 0.4);
              } else if (uStyle < 2.5) {
                // Ice world
                float cracks = fbm(p * 5.5);
                float frost = fbm(p * 2.8 + 4.0);
                float deep = smoothstep(0.35, 0.7, cracks);
                color = mix(uDark, uBase, 0.4 + frost * 0.5);
                color = mix(color, uLand, deep * 0.35);
                color = mix(color, vec3(0.85, 0.93, 1.0), smoothstep(0.55, 0.9, abs(lat)) * 0.45);
                color += uAccent * pow(1.0 - abs(lat), 3.0) * 0.08;
              } else {
                // Terra — oceans + continents + polar caps
                float landMask = smoothstep(0.48, 0.58, fbm(p * 2.6 + 1.7));
                float mountains = smoothstep(0.6, 0.85, fbm(p * 6.0));
                float poles = smoothstep(0.68, 0.9, abs(lat));
                color = mix(uBase, uDark, 0.25 + fbm(p * 3.0) * 0.2);
                color = mix(color, uLand, landMask);
                color = mix(color, uLand * 0.75, landMask * mountains * 0.45);
                color = mix(color, vec3(0.92, 0.95, 0.98), poles);
              }

              vec3 shotGradient = mix(uShotBase, uShotAccent, 0.5 + 0.5 * sin((vUv.x * 18.0) - uTime * 2.1));
              color = mix(color, shotGradient, uShot * 0.72);

              float fresnel = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.6);
              color += uAccent * fresnel * (0.06 + uActive * 0.1);
              color += uShotAccent * fresnel * uShot * 0.3;

              vec3 lightDir = normalize(vec3(0.4, 0.55, 0.45));
              float lightStrength = 0.38 + max(dot(n, lightDir), 0.0) * 0.62;
              float wrap = max(dot(n, lightDir) * 0.5 + 0.5, 0.0);
              color *= mix(lightStrength, wrap, 0.25);

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>

      {/* Soft cloud layer for terra / ice */}
      {showClouds ? (
        <mesh ref={cloudsRef} scale={planet.radius * 1.018}>
          <sphereGeometry args={[1, 48, 48]} />
          <shaderMaterial
            ref={cloudsMaterialRef}
            transparent
            depthWrite={false}
            uniforms={{
              uTime: { value: 0 },
              uCloud: { value: new Color(planet.id === 'resume' ? '#e0f2fe' : '#f8fafc') }
            }}
            vertexShader={`
              varying vec3 vLocalPos;
              varying vec3 vNormal;
              void main() {
                vLocalPos = position;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform vec3 uCloud;
              varying vec3 vLocalPos;
              varying vec3 vNormal;

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
                vec3 p = normalize(vLocalPos);
                float c = noise(p * 4.5 + vec3(uTime * 0.015, 0.0, 0.0));
                c = smoothstep(0.52, 0.78, c);
                float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
                float alpha = c * (0.28 + fresnel * 0.15);
                gl_FragColor = vec4(uCloud, alpha);
              }
            `}
          />
        </mesh>
      ) : null}

      {/* Atmosphere rim */}
      <mesh ref={atmosphereRef} scale={glowScale}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          ref={atmosphereMaterialRef}
          transparent
          depthWrite={false}
          side={DoubleSide}
          uniforms={{
            uAccent: { value: accentColor },
            uBase: { value: baseColor },
            uActive: { value: isNearest ? 1 : 0 },
            uShot: { value: 0 }
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
              vec4 world = modelMatrix * vec4(position, 1.0);
              vNormal = normalize(normalMatrix * normal);
              vView = normalize(cameraPosition - world.xyz);
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `}
          fragmentShader={`
            uniform vec3 uAccent;
            uniform vec3 uBase;
            uniform float uActive;
            uniform float uShot;
            varying vec3 vNormal;
            varying vec3 vView;

            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.8);
              float alpha = fresnel * (0.22 + uActive * 0.18) + uShot * 0.12;
              vec3 color = mix(uBase, uAccent, 0.45 + uActive * 0.2);
              gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.55));
            }
          `}
        />
      </mesh>

      {/* Planetary rings — gas/rocky only */}
      {showMainRing ? (
        <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0.15, 0]}>
          <torusGeometry args={[planet.radius + 0.42, 0.055, 10, 96]} />
          <meshStandardMaterial
            color={planet.accent}
            emissive={planet.accent}
            emissiveIntensity={0.15}
            metalness={0.3}
            roughness={0.65}
            transparent
            opacity={isNearest ? 0.85 : 0.5}
          />
        </mesh>
      ) : null}

      {planet.id === 'about' ? (
        <mesh ref={outerRingRef} rotation={[Math.PI / 2.35, -0.2, 0.4]}>
          <torusGeometry args={[planet.radius + 0.68, 0.028, 8, 80]} />
          <meshBasicMaterial color={planet.accent} transparent opacity={0.35} />
        </mesh>
      ) : null}

      <group ref={accentGroupRef}>
        {planet.id === 'projects' ? (
          <>
            <mesh position={[planet.radius + 0.85, 0.1, 0.1]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#d6d3d1" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[-planet.radius - 0.6, -0.2, 0.3]}>
              <sphereGeometry args={[0.09, 14, 14]} />
              <meshStandardMaterial color="#a8a29e" roughness={0.95} />
            </mesh>
          </>
        ) : null}

        {planet.id === 'resume' ? (
          <mesh position={[planet.radius + 0.7, 0.15, -0.1]}>
            <sphereGeometry args={[0.11, 14, 14]} />
            <meshStandardMaterial color="#e0f2fe" emissive="#bae6fd" emissiveIntensity={0.25} roughness={0.4} />
          </mesh>
        ) : null}

        {planet.id === 'contact' ? (
          <mesh ref={pulseRef} position={[0, planet.radius + 0.95, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#86efac" transparent opacity={0.75} />
          </mesh>
        ) : null}
      </group>

      {showLabel ? (
        <Html position={[0, planet.radius + 1.15, 0]} center distanceFactor={13} zIndexRange={[12, 0]}>
          <div className={`planet-label ${isNearest ? 'is-nearest' : ''}`}>
            <strong>{planet.title}</strong>
            <span>{planet.subtitle}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
};

export default Planet;
