import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';

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
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.35, 1.25, 24]} />
        <meshStandardMaterial color={bodyColor} metalness={0.25} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.28, 0.75, 24]} />
        <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.35} />
      </mesh>

      <mesh position={[0, 0.1, -0.38]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
      </mesh>

      {[-1, 1].map((direction) => (
        <group key={direction} position={[direction * 0.36, -0.12, 0.02]} rotation={[0, 0, direction * 0.55]}>
          <mesh>
            <boxGeometry args={[0.1, 0.45, 0.72]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.1} roughness={0.7} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.14, 0.62, 18]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

export default RocketShip;
