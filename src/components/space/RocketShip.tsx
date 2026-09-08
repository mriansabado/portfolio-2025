import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils, Mesh, MeshBasicMaterial } from 'three';

interface RocketShipProps {
  positionRef: MutableRefObject<{ x: number; y: number; z: number }>;
  yawRef: MutableRefObject<number>;
  velocityRef: MutableRefObject<number>;
  steerRef: MutableRefObject<number>;
  isNightMode: boolean;
}

const RocketShip = ({ positionRef, yawRef, velocityRef, steerRef, isNightMode }: RocketShipProps) => {
  const bodyColor = useMemo(() => (isNightMode ? '#f8fafc' : '#e2e8f0'), [isNightMode]);
  const groupRef = useRef<Group>(null);
  const bankRef = useRef(0);
  const pitchRef = useRef(0);
  const thrusterRef = useRef<Mesh>(null);
  const thrusterMaterialRef = useRef<MeshBasicMaterial>(null);
  const cockpitGlowRef = useRef<MeshBasicMaterial>(null);
  const beaconMaterialRef = useRef<MeshBasicMaterial>(null);

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
    const targetOpacity = thrusterActive ? 0.92 : 0.08;
    const targetScaleY = thrusterActive ? Math.min(1.9, 1 + speed * 0.055) : 0.45;
    const pulse = (Math.sin(performance.now() * 0.01) + 1) * 0.5;

    if (thrusterMaterialRef.current) {
      thrusterMaterialRef.current.opacity = MathUtils.lerp(
        thrusterMaterialRef.current.opacity,
        targetOpacity,
        1 - Math.pow(0.02, delta)
      );
    }

    if (thrusterRef.current) {
      thrusterRef.current.scale.y = MathUtils.lerp(
        thrusterRef.current.scale.y,
        targetScaleY,
        1 - Math.pow(0.02, delta)
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
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.29, 1.45, 24]} />
        <meshStandardMaterial color={bodyColor} metalness={0.4} roughness={0.32} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.35, 1.25, 24]} />
        <meshStandardMaterial color={bodyColor} metalness={0.25} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.28, 0.75, 24]} />
        <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.35} />
      </mesh>

      <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.05, 18, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.65} roughness={0.24} />
      </mesh>

      <mesh position={[0, 0.1, -0.38]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
      </mesh>

      <mesh position={[0, 0.1, -0.38]} scale={1.35}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshBasicMaterial ref={cockpitGlowRef} color="#93c5fd" transparent opacity={0.4} />
      </mesh>

      {[-1, 1].map((direction) => (
        <group key={direction} position={[direction * 0.36, -0.12, 0.02]} rotation={[0, 0, direction * 0.55]}>
          <mesh>
            <boxGeometry args={[0.1, 0.45, 0.72]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.1} roughness={0.7} />
          </mesh>
          <mesh position={[direction * 0.08, -0.04, 0.15]} rotation={[0, 0, direction * -0.3]}>
            <boxGeometry args={[0.07, 0.34, 0.34]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.35} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {[-1, 1].map((direction) => (
        <group key={`fin-${direction}`} position={[direction * 0.22, -0.2, 0.72]} rotation={[0.18, 0, direction * 0.18]}>
          <mesh>
            <boxGeometry args={[0.08, 0.42, 0.54]} />
            <meshStandardMaterial color="#f97316" metalness={0.18} roughness={0.58} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.24, 0.52]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial ref={beaconMaterialRef} color="#fef08a" transparent opacity={0.35} />
      </mesh>

      <mesh ref={thrusterRef} position={[0, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.14, 0.62, 18]} />
        <meshBasicMaterial ref={thrusterMaterialRef} color="#fb923c" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};

export default RocketShip;
