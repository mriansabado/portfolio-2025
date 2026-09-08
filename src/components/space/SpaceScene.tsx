import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Stars } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import { MathUtils, Vector3 } from 'three';
import Planet from './Planet';
import RocketShip from './RocketShip';
import useRocketControls from './useRocketControls';
import { planets, type PlanetId } from '../../data/planets';

interface SpaceSceneProps {
  isNightMode: boolean;
  panelOpen: boolean;
  selectedPlanetId: PlanetId | null;
  onNearestPlanetChange: (planetId: PlanetId | null) => void;
  onPlanetSelect: (planetId: PlanetId) => void;
}

const PLAY_BOUNDS = 14;
const INTERACTION_DISTANCE = 2.9;
const SHIP_CONTACT_RADIUS = 0.8;

const SpaceWorld = ({
  isNightMode,
  panelOpen,
  selectedPlanetId,
  onNearestPlanetChange,
  onPlanetSelect
}: SpaceSceneProps) => {
  const controls = useRocketControls(panelOpen);
  const shipPosition = useRef(new Vector3(0, 0.35, 0));
  const velocity = useRef(0);
  const yaw = useRef(Math.PI);
  const steer = useRef(0);
  const cameraTarget = useRef(new Vector3());
  const touchLockRef = useRef<PlanetId | null>(null);
  const planetPositions = useMemo(
    () =>
      Object.fromEntries(planets.map((planet) => [planet.id, new Vector3(...planet.position)])) as Record<PlanetId, Vector3>,
    []
  );
  const [nearestPlanetId, setNearestPlanetId] = useState<PlanetId | null>(null);

  useFrame(({ camera }, delta) => {
    const turnSpeed = 2.05;
    const baseAcceleration = 11.8;
    const damping = panelOpen ? 0.86 : 0.95;
    const steerInput = panelOpen ? 0 : (controls.left ? 1 : 0) - (controls.right ? 1 : 0);
    steer.current = steerInput;

    if (!panelOpen) {
      yaw.current += steerInput * turnSpeed * delta;

      if (controls.forward) velocity.current += baseAcceleration * delta;
      if (controls.backward) velocity.current -= baseAcceleration * 0.82 * delta;
    }

    velocity.current = MathUtils.clamp(velocity.current * damping, -8.2, 18.5);

    const movement = new Vector3(Math.sin(yaw.current), 0, Math.cos(yaw.current)).multiplyScalar(velocity.current * delta);
    shipPosition.current.add(movement);

    shipPosition.current.x = MathUtils.clamp(shipPosition.current.x, -PLAY_BOUNDS, PLAY_BOUNDS);
    shipPosition.current.z = MathUtils.clamp(shipPosition.current.z, -PLAY_BOUNDS, PLAY_BOUNDS);
    shipPosition.current.y = 0.35 + Math.sin(performance.now() * 0.0018) * 0.07;

    let closestPlanet: PlanetId | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    planets.forEach((planet) => {
      const distance = shipPosition.current.distanceTo(planetPositions[planet.id]) - planet.radius;
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPlanet = planet.id;
      }
    });

    const withinRange = closestDistance <= INTERACTION_DISTANCE ? closestPlanet : null;
    if (withinRange !== nearestPlanetId) {
      setNearestPlanetId(withinRange);
      onNearestPlanetChange(withinRange);
    }

    const isTouchingPlanet = closestPlanet !== null && closestDistance <= SHIP_CONTACT_RADIUS;
    if (isTouchingPlanet && closestPlanet) {
      const touchedPlanet = planets.find((planet) => planet.id === closestPlanet);

      if (touchedPlanet) {
        const planetCenter = planetPositions[touchedPlanet.id];
        const pushDirection = shipPosition.current.clone().sub(planetCenter).normalize();
        shipPosition.current.copy(
          planetCenter.clone().add(pushDirection.multiplyScalar(touchedPlanet.radius + SHIP_CONTACT_RADIUS))
        );
      }

      velocity.current = Math.min(velocity.current, 0.15);

      if (!panelOpen && touchLockRef.current !== closestPlanet) {
        touchLockRef.current = closestPlanet;
        onPlanetSelect(closestPlanet);
      }
    } else if (touchLockRef.current) {
      touchLockRef.current = null;
    }

    const cameraOffset = new Vector3(0, 4.7, 9.6).applyAxisAngle(new Vector3(0, 1, 0), yaw.current);
    cameraTarget.current.copy(shipPosition.current).add(cameraOffset);
    camera.position.lerp(cameraTarget.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(shipPosition.current.x, shipPosition.current.y + 0.3, shipPosition.current.z - 2.4);
  });

  const ambientColor = isNightMode ? '#b8c7ff' : '#dbeafe';

  return (
    <>
      <color attach="background" args={[isNightMode ? '#020617' : '#0f172a']} />
      <fog attach="fog" args={[isNightMode ? '#020617' : '#0f172a', 14, 40]} />
      <ambientLight intensity={0.7} color={ambientColor} />
      <directionalLight position={[8, 10, 5]} intensity={1.6} color={isNightMode ? '#ffffff' : '#fef3c7'} />
      <pointLight position={[0, 6, -6]} intensity={10} distance={30} color="#f59e0b" />

      <Stars radius={120} depth={45} count={6000} factor={4} fade speed={0.8} />
      <Sparkles count={90} speed={0.24} opacity={0.75} color={isNightMode ? '#e0e7ff' : '#ffffff'} scale={[28, 10, 28]} size={2.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[26, 96]} />
        <meshStandardMaterial color={isNightMode ? '#081224' : '#13213e'} transparent opacity={0.92} />
      </mesh>

      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          isNearest={nearestPlanetId === planet.id || selectedPlanetId === planet.id}
          showLabel={!panelOpen}
          onSelect={onPlanetSelect}
        />
      ))}

      <RocketShip
        positionRef={shipPosition}
        yawRef={yaw}
        velocityRef={velocity}
        steerRef={steer}
        isNightMode={isNightMode}
      />

      <Environment preset="night" />
    </>
  );
};

const SpaceScene = (props: SpaceSceneProps) => {
  const camera = useMemo(() => ({ position: [0, 4.5, 12] as [number, number, number], fov: 50 }), []);

  return (
    <Canvas className="space-canvas" camera={camera}>
      <SpaceWorld {...props} />
    </Canvas>
  );
};

export default SpaceScene;
