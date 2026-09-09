import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils, Mesh, MeshBasicMaterial, PointLight } from 'three';

interface RocketShipProps {
  positionRef: MutableRefObject<{ x: number; y: number; z: number }>;
  yawRef: MutableRefObject<number>;
  velocityRef: MutableRefObject<number>;
  steerRef: MutableRefObject<number>;
  isNightMode: boolean;
}

const RocketShip = ({ positionRef, yawRef, velocityRef, steerRef, isNightMode }: RocketShipProps) => {
  const hullColor = useMemo(() => (isNightMode ? '#dbe4f0' : '#c5d0de'), [isNightMode]);
  const panelColor = useMemo(() => (isNightMode ? '#94a3b8' : '#7c8ba1'), [isNightMode]);
  const groupRef = useRef<Group>(null);
  const bankRef = useRef(0);
  const pitchRef = useRef(0);
  const thrusterCoreRef = useRef<Mesh>(null);
  const thrusterMidRef = useRef<Mesh>(null);
  const thrusterOuterRef = useRef<Mesh>(null);
  const thrusterCoreMatRef = useRef<MeshBasicMaterial>(null);
  const thrusterMidMatRef = useRef<MeshBasicMaterial>(null);
  const thrusterOuterMatRef = useRef<MeshBasicMaterial>(null);
  const cockpitGlowRef = useRef<MeshBasicMaterial>(null);
  const beaconMaterialRef = useRef<MeshBasicMaterial>(null);
  const stripeGlowRef = useRef<MeshBasicMaterial>(null);
  const thrusterLightRef = useRef<PointLight>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetBank = MathUtils.clamp(steerRef.current * -0.4, -0.4, 0.4);
    const targetPitch = MathUtils.clamp(-velocityRef.current * 0.035, -0.28, 0.2);

    bankRef.current = MathUtils.lerp(bankRef.current, targetBank, 1 - Math.pow(0.01, delta));
    pitchRef.current = MathUtils.lerp(pitchRef.current, targetPitch, 1 - Math.pow(0.01, delta));

    groupRef.current.position.set(positionRef.current.x, positionRef.current.y, positionRef.current.z);
    groupRef.current.rotation.set(pitchRef.current, yawRef.current, bankRef.current);

    const speed = Math.abs(velocityRef.current);
    const thrusterActive = speed > 0.35;
    const pulse = (Math.sin(performance.now() * 0.01) + 1) * 0.5;
    const flicker = 0.85 + Math.sin(performance.now() * 0.045) * 0.15;

    const coreOpacity = thrusterActive ? 0.95 * flicker : 0.06;
    const midOpacity = thrusterActive ? 0.55 * flicker : 0.04;
    const outerOpacity = thrusterActive ? 0.28 : 0.02;
    const coreScale = thrusterActive ? Math.min(2.1, 1.05 + speed * 0.06) : 0.4;
    const midScale = thrusterActive ? Math.min(2.4, 1.2 + speed * 0.07) : 0.45;
    const outerScale = thrusterActive ? Math.min(2.8, 1.35 + speed * 0.08) : 0.5;

    if (thrusterCoreMatRef.current) {
      thrusterCoreMatRef.current.opacity = MathUtils.lerp(
        thrusterCoreMatRef.current.opacity,
        coreOpacity,
        1 - Math.pow(0.02, delta)
      );
    }
    if (thrusterMidMatRef.current) {
      thrusterMidMatRef.current.opacity = MathUtils.lerp(
        thrusterMidMatRef.current.opacity,
        midOpacity,
        1 - Math.pow(0.02, delta)
      );
    }
    if (thrusterOuterMatRef.current) {
      thrusterOuterMatRef.current.opacity = MathUtils.lerp(
        thrusterOuterMatRef.current.opacity,
        outerOpacity,
        1 - Math.pow(0.025, delta)
      );
    }

    if (thrusterCoreRef.current) {
      thrusterCoreRef.current.scale.y = MathUtils.lerp(
        thrusterCoreRef.current.scale.y,
        coreScale,
        1 - Math.pow(0.02, delta)
      );
    }
    if (thrusterMidRef.current) {
      thrusterMidRef.current.scale.y = MathUtils.lerp(
        thrusterMidRef.current.scale.y,
        midScale,
        1 - Math.pow(0.02, delta)
      );
    }
    if (thrusterOuterRef.current) {
      thrusterOuterRef.current.scale.y = MathUtils.lerp(
        thrusterOuterRef.current.scale.y,
        outerScale,
        1 - Math.pow(0.025, delta)
      );
    }

    if (thrusterLightRef.current) {
      thrusterLightRef.current.intensity = MathUtils.lerp(
        thrusterLightRef.current.intensity,
        thrusterActive ? 2.8 + speed * 0.12 : 0.05,
        1 - Math.pow(0.03, delta)
      );
    }

    if (cockpitGlowRef.current) {
      cockpitGlowRef.current.opacity = MathUtils.lerp(
        cockpitGlowRef.current.opacity,
        0.28 + pulse * 0.26,
        1 - Math.pow(0.03, delta)
      );
    }

    if (beaconMaterialRef.current) {
      beaconMaterialRef.current.opacity = MathUtils.lerp(
        beaconMaterialRef.current.opacity,
        0.22 + pulse * 0.6,
        1 - Math.pow(0.03, delta)
      );
    }

    if (stripeGlowRef.current) {
      stripeGlowRef.current.opacity = MathUtils.lerp(
        stripeGlowRef.current.opacity,
        0.35 + pulse * 0.25,
        1 - Math.pow(0.04, delta)
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main fuselage — tapered stack */}
      <mesh position={[0, 0, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 1.15, 28]} />
        <meshStandardMaterial color={hullColor} metalness={0.72} roughness={0.28} />
      </mesh>

      <mesh position={[0, 0, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.42, 28]} />
        <meshStandardMaterial color={hullColor} metalness={0.68} roughness={0.3} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.16, 0.48, 28]} />
        <meshStandardMaterial color="#fb7185" metalness={0.45} roughness={0.35} emissive="#fb7185" emissiveIntensity={0.22} />
      </mesh>

      {/* Nose tip spike */}
      <mesh position={[0, 0, -1.02]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.035, 0.18, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Hull panel rings */}
      {[0.05, 0.38, 0.68].map((z) => (
        <mesh key={`ring-${z}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.265, 0.018, 10, 36]} />
          <meshStandardMaterial color={panelColor} metalness={0.8} roughness={0.22} />
        </mesh>
      ))}

      {/* Side accent stripes */}
      <mesh position={[0.215, 0.02, 0.28]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.03, 0.06, 0.85]} />
        <meshBasicMaterial ref={stripeGlowRef} color="#38bdf8" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-0.215, 0.02, 0.28]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.03, 0.06, 0.85]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>

      {/* Vent / greeble blocks */}
      {[-1, 1].map((side) => (
        <mesh key={`vent-${side}`} position={[side * 0.24, -0.08, 0.55]}>
          <boxGeometry args={[0.08, 0.1, 0.22]} />
          <meshStandardMaterial color="#64748b" metalness={0.55} roughness={0.4} />
        </mesh>
      ))}

      {/* Cockpit canopy */}
      <mesh position={[0, 0.14, -0.32]} scale={[1, 0.72, 1.35]}>
        <sphereGeometry args={[0.14, 22, 22]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.15} roughness={0.12} emissive="#38bdf8" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 0.14, -0.32]} scale={[1.2, 0.9, 1.55]}>
        <sphereGeometry args={[0.14, 22, 22]} />
        <meshBasicMaterial ref={cockpitGlowRef} color="#7dd3fc" transparent opacity={0.4} />
      </mesh>

      {/* Dorsal ridge */}
      <mesh position={[0, 0.22, 0.2]}>
        <boxGeometry args={[0.06, 0.08, 0.7]} />
        <meshStandardMaterial color={panelColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Beacon */}
      <mesh position={[0, 0.3, 0.48]}>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshBasicMaterial ref={beaconMaterialRef} color="#fef08a" transparent opacity={0.35} />
      </mesh>

      {/* Angular wings */}
      {[-1, 1].map((direction) => (
        <group key={`wing-${direction}`} position={[direction * 0.28, -0.06, 0.15]}>
          <mesh rotation={[0.12, direction * -0.15, direction * 0.48]}>
            <boxGeometry args={[0.08, 0.52, 0.78]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.25} roughness={0.55} />
          </mesh>
          <mesh position={[direction * 0.1, -0.08, 0.12]} rotation={[0.08, 0, direction * 0.35]}>
            <boxGeometry args={[0.05, 0.28, 0.36]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.55} roughness={0.35} />
          </mesh>
          {/* Wing tip light */}
          <mesh position={[direction * 0.18, -0.18, -0.28]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Rear stabilizer fins */}
      {[-1, 1].map((direction) => (
        <group key={`fin-${direction}`} position={[direction * 0.18, -0.12, 0.78]} rotation={[0.22, 0, direction * 0.22]}>
          <mesh>
            <boxGeometry args={[0.06, 0.38, 0.48]} />
            <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.18, 0.82]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.05, 0.32, 0.4]} />
        <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Side thruster pods */}
      {[-1, 1].map((side) => (
        <group key={`pod-${side}`} position={[side * 0.32, -0.14, 0.72]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.09, 0.32, 14]} />
            <meshStandardMaterial color="#64748b" metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.095, 0.065, 0.12, 14]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.05, 0.22, 12]} />
            <meshBasicMaterial color="#fb923c" transparent opacity={0.45} />
          </mesh>
        </group>
      ))}

      {/* Main engine bell */}
      <mesh position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.12, 0.28, 20]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 1.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.1, 20]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Exhaust plume layers */}
      <mesh ref={thrusterCoreRef} position={[0, 0, 1.42]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.55, 16]} />
        <meshBasicMaterial ref={thrusterCoreMatRef} color="#fef9c3" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={thrusterMidRef} position={[0, 0, 1.48]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.13, 0.72, 16]} />
        <meshBasicMaterial ref={thrusterMidMatRef} color="#fb923c" transparent opacity={0.05} depthWrite={false} />
      </mesh>
      <mesh ref={thrusterOuterRef} position={[0, 0, 1.55]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.18, 0.9, 16]} />
        <meshBasicMaterial ref={thrusterOuterMatRef} color="#f43f5e" transparent opacity={0.03} depthWrite={false} />
      </mesh>

      <pointLight ref={thrusterLightRef} position={[0, 0, 1.35]} color="#fb923c" intensity={0.05} distance={4} decay={2} />
    </group>
  );
};

export default RocketShip;
