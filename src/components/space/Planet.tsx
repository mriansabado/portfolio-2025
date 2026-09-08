import { Html } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, Group, Mesh, ShaderMaterial } from 'three';
import type { PlanetDefinition } from '../../data/planets';

interface PlanetProps {
  planet: PlanetDefinition;
  isNearest: boolean;
  showLabel: boolean;
  canSelect: boolean;
  onSelect: (id: PlanetDefinition['id']) => void;
}

const Planet = ({ planet, isNearest, showLabel, canSelect, onSelect }: PlanetProps) => {
  const glowScale = planet.radius * (isNearest ? 1.8 : 1.45);
  const bodyRef = useRef<Mesh>(null);
  const bodyMaterialRef = useRef<ShaderMaterial>(null);
  const ringRef = useRef<Mesh>(null);
  const accentGroupRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const bandRef = useRef<Mesh>(null);
  const surfaceTint = useMemo(() => new Color(planet.color).offsetHSL(0, 0.08, 0.08).getStyle(), [planet.color]);
  const shadowTint = useMemo(() => new Color(planet.color).offsetHSL(0, -0.05, -0.14).getStyle(), [planet.color]);
  const gradientTint = useMemo(() => new Color(planet.color).offsetHSL(0.02, 0.14, 0.16).getStyle(), [planet.color]);
  const baseColor = useMemo(() => new Color(planet.color), [planet.color]);
  const accentColor = useMemo(() => new Color(planet.accent), [planet.accent]);
  const darkColor = useMemo(() => new Color(planet.color).offsetHSL(0, -0.08, -0.28), [planet.color]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * 0.18;
      bodyRef.current.rotation.z = Math.sin(elapsed * 0.45 + planet.radius) * 0.04;
    }

    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.uniforms.uTime.value = elapsed;
      bodyMaterialRef.current.uniforms.uActive.value = isNearest ? 1 : 0;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = Math.PI / 2.75 + Math.sin(elapsed * 0.35 + planet.radius) * 0.08;
    }

    if (accentGroupRef.current) {
      accentGroupRef.current.rotation.y += delta * (0.35 + planet.radius * 0.04);
    }

    if (pulseRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.18;
      pulseRef.current.scale.setScalar(pulse);
    }

    if (atmosphereRef.current) {
      const targetScale = glowScale * (1 + Math.sin(elapsed * 1.4) * 0.02);
      atmosphereRef.current.scale.setScalar(targetScale);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.22;
      shellRef.current.rotation.x = Math.sin(elapsed * 0.5 + planet.radius) * 0.18;
    }

    if (bandRef.current) {
      bandRef.current.rotation.y += delta * 0.28;
      bandRef.current.rotation.z = Math.sin(elapsed * 0.9) * 0.14;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!canSelect) {
      return;
    }
    onSelect(planet.id);
  };

  return (
    <group position={planet.position}>
      <mesh ref={bodyRef} onClick={handleClick}>
        <sphereGeometry args={[planet.radius, 48, 48]} />
        <shaderMaterial
          ref={bodyMaterialRef}
          uniforms={{
            uTime: { value: 0 },
            uBase: { value: baseColor },
            uAccent: { value: accentColor },
            uDark: { value: darkColor },
            uActive: { value: isNearest ? 1 : 0 }
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;

            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPos = worldPosition.xyz;
              gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uActive;
            uniform vec3 uBase;
            uniform vec3 uAccent;
            uniform vec3 uDark;

            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPos;

            void main() {
              float swirl = sin((vUv.y * 18.0) + uTime * 0.85);
              float diagonal = sin(((vUv.x + vUv.y) * 14.0) - uTime * 0.65);
              float ripple = sin(length(vWorldPos.xz) * 3.8 - uTime * 0.75);
              float mixA = smoothstep(-1.0, 1.0, swirl * 0.55 + diagonal * 0.35 + ripple * 0.2);

              vec3 color = mix(uDark, uBase, 0.55 + 0.25 * sin(vUv.y * 10.0 + uTime * 0.35));
              color = mix(color, uAccent, mixA * 0.45);

              float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
              color += uAccent * fresnel * (0.08 + uActive * 0.12);

              vec3 lightDir = normalize(vec3(0.35, 0.6, 0.5));
              float lightStrength = 0.45 + max(dot(normalize(vNormal), lightDir), 0.0) * 0.55;
              color *= lightStrength;

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>

      <mesh position={[planet.radius * 0.18, planet.radius * 0.08, -planet.radius * 0.22]}>
        <sphereGeometry args={[planet.radius * 0.22, 18, 18]} />
        <meshStandardMaterial color={surfaceTint} emissive={surfaceTint} emissiveIntensity={0.15} roughness={0.92} />
      </mesh>

      <mesh position={[-planet.radius * 0.3, -planet.radius * 0.2, planet.radius * 0.14]}>
        <sphereGeometry args={[planet.radius * 0.14, 18, 18]} />
        <meshStandardMaterial color={shadowTint} roughness={0.98} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2.75, 0, 0]}>
        <torusGeometry args={[planet.radius + 0.32, 0.045, 12, 96]} />
        <meshBasicMaterial color={planet.accent} transparent opacity={isNearest ? 0.95 : 0.45} />
      </mesh>

      <mesh ref={atmosphereRef} scale={glowScale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={planet.color} transparent opacity={isNearest ? 0.12 : 0.05} />
      </mesh>

      <mesh ref={shellRef} scale={planet.radius * 1.04}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={gradientTint} emissive={gradientTint} emissiveIntensity={0.12} transparent opacity={0.18} roughness={0.55} />
      </mesh>

      <mesh ref={bandRef} rotation={[0.5, 0, 0.2]}>
        <torusGeometry args={[planet.radius * 0.72, planet.radius * 0.06, 12, 64]} />
        <meshBasicMaterial color={surfaceTint} transparent opacity={0.16} />
      </mesh>

      <group ref={accentGroupRef}>
        {planet.id === 'projects' ? (
          <>
            <mesh position={[planet.radius + 0.75, 0.12, 0]}>
              <sphereGeometry args={[0.14, 14, 14]} />
              <meshBasicMaterial color="#fde68a" />
            </mesh>
            <mesh position={[-planet.radius - 0.55, -0.15, 0.35]}>
              <sphereGeometry args={[0.1, 14, 14]} />
              <meshBasicMaterial color="#fff7d6" transparent opacity={0.85} />
            </mesh>
          </>
        ) : null}

        {planet.id === 'about' ? (
          <mesh rotation={[0.8, 0, 0.3]}>
            <torusGeometry args={[planet.radius + 0.55, 0.03, 10, 64]} />
            <meshBasicMaterial color={planet.accent} transparent opacity={0.4} />
          </mesh>
        ) : null}

        {planet.id === 'resume' ? (
          <>
            <mesh position={[0, planet.radius + 0.45, 0]} rotation={[0.45, 0.2, 0]}>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
              <meshStandardMaterial color="#e0f2fe" emissive="#e0f2fe" emissiveIntensity={0.35} />
            </mesh>
            <mesh position={[planet.radius + 0.5, -0.18, 0.2]} rotation={[0.2, 0.7, 0.2]}>
              <boxGeometry args={[0.14, 0.14, 0.14]} />
              <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={0.3} />
            </mesh>
          </>
        ) : null}

        {planet.id === 'contact' ? (
          <mesh ref={pulseRef} position={[0, planet.radius + 0.85, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#86efac" transparent opacity={0.8} />
          </mesh>
        ) : null}
      </group>

      {showLabel ? (
        <Html position={[0, planet.radius + 1.1, 0]} center distanceFactor={13}>
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
