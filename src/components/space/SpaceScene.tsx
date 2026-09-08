import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Stars } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  MathUtils,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Vector3
} from 'three';
import Planet from './Planet';
import RocketShip from './RocketShip';
import useRocketControls, { type RocketControlsState } from './useRocketControls';
import { planets, type PlanetId } from '../../data/planets';

interface SpaceSceneProps {
  isNightMode: boolean;
  panelOpen: boolean;
  selectedPlanetId: PlanetId | null;
  touchControls: RocketControlsState;
  onTouchCruiseChange: (direction: 'forward' | 'backward' | 'idle') => void;
  onNearestPlanetChange: (planetId: PlanetId | null) => void;
  onPlanetSelect: (planetId: PlanetId) => void;
}

interface CameraInputRefs {
  lookX: MutableRefObject<number>;
  lookY: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
  canSelect: MutableRefObject<boolean>;
}

const PLAY_BOUNDS = 14;
const INTERACTION_DISTANCE = 2.9;
const SHIP_CONTACT_RADIUS = 0.8;

const SpaceWorld = ({
  isNightMode,
  panelOpen,
  selectedPlanetId,
  touchControls,
  onNearestPlanetChange,
  onPlanetSelect,
  cameraInput
}: SpaceSceneProps & { cameraInput: CameraInputRefs }) => {
  const controls = useRocketControls(panelOpen, touchControls);
  const shipPosition = useRef(new Vector3(0, 0.35, 0));
  const velocity = useRef(0);
  const yaw = useRef(Math.PI);
  const steer = useRef(0);
  const cameraTarget = useRef(new Vector3());
  const ambientLightRef = useRef<AmbientLight>(null);
  const directionalLightRef = useRef<DirectionalLight>(null);
  const accentLightRef = useRef<PointLight>(null);
  const sunLightRef = useRef<PointLight>(null);
  const floorMaterialRef = useRef<MeshStandardMaterial>(null);
  const sunMaterialRef = useRef<MeshStandardMaterial>(null);
  const sunGlowMaterialRef = useRef<MeshBasicMaterial>(null);
  const touchLockRef = useRef<PlanetId | null>(null);
  const themeMixRef = useRef(isNightMode ? 0 : 1);
  const transitionStartRef = useRef(themeMixRef.current);
  const transitionTargetRef = useRef(themeMixRef.current);
  const transitionProgressRef = useRef(1);
  const planetPositions = useMemo(
    () =>
      Object.fromEntries(planets.map((planet) => [planet.id, new Vector3(...planet.position)])) as Record<PlanetId, Vector3>,
    []
  );
  const [nearestPlanetId, setNearestPlanetId] = useState<PlanetId | null>(null);
  const palette = useMemo(
    () => ({
      nightBackground: new Color('#020617'),
      dayBackground: new Color('#1e3a8a'),
      nightFog: new Color('#020617'),
      dayFog: new Color('#2563eb'),
      nightAmbient: new Color('#b8c7ff'),
      dayAmbient: new Color('#dbeafe'),
      nightDirectional: new Color('#ffffff'),
      dayDirectional: new Color('#f8fafc'),
      nightFloor: new Color('#081224'),
      dayFloor: new Color('#13213e')
    }),
    []
  );

  useEffect(() => {
    transitionStartRef.current = themeMixRef.current;
    transitionTargetRef.current = isNightMode ? 0 : 1;
    transitionProgressRef.current = 0;
  }, [isNightMode]);

  useFrame(({ camera, scene }, delta) => {
    const turnSpeed = 2.05;
    const baseAcceleration = 11.8;
    const damping = panelOpen ? 0.86 : 0.95;
    const isTouchCruising = touchControls.forward || touchControls.backward;
    let steerInput = panelOpen ? 0 : (controls.left ? 1 : 0) - (controls.right ? 1 : 0);
    steer.current = steerInput;

    if (!panelOpen) {
      yaw.current += steerInput * turnSpeed * delta;

      if (isTouchCruising) {
        const targetVelocity = touchControls.forward ? 5.4 : touchControls.backward ? -4.2 : 0;
        velocity.current = MathUtils.lerp(velocity.current, targetVelocity, 1 - Math.pow(0.02, delta));
      } else {
        if (controls.forward) velocity.current += baseAcceleration * delta;
        if (controls.backward) velocity.current -= baseAcceleration * 0.82 * delta;
      }
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

    const lookYaw = yaw.current + cameraInput.lookX.current * 0.55;
    const lookLift = 4.7 + cameraInput.lookY.current * -1.4;
    const lookDistance = 9.6;
    const cameraOffset = new Vector3(0, lookLift, lookDistance).applyAxisAngle(new Vector3(0, 1, 0), lookYaw);
    cameraTarget.current.copy(shipPosition.current).add(cameraOffset);
    camera.position.lerp(cameraTarget.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(
      shipPosition.current.x + cameraInput.lookX.current * 1.8,
      shipPosition.current.y + 0.35 + cameraInput.lookY.current * 0.55,
      shipPosition.current.z - 0.4
    );

    transitionProgressRef.current = Math.min(1, transitionProgressRef.current + delta / 2);
    const easedMix = MathUtils.smootherstep(transitionProgressRef.current, 0, 1);
    themeMixRef.current = MathUtils.lerp(transitionStartRef.current, transitionTargetRef.current, easedMix);
    const mix = themeMixRef.current;

    scene.background = palette.nightBackground.clone().lerp(palette.dayBackground, mix);
    if (scene.fog) {
      scene.fog.color.copy(palette.nightFog.clone().lerp(palette.dayFog, mix));
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.copy(palette.nightAmbient.clone().lerp(palette.dayAmbient, mix));
      ambientLightRef.current.intensity = MathUtils.lerp(0.7, 0.82, mix);
    }

    if (directionalLightRef.current) {
      directionalLightRef.current.color.copy(palette.nightDirectional.clone().lerp(palette.dayDirectional, mix));
      directionalLightRef.current.intensity = MathUtils.lerp(1.6, 1.95, mix);
    }

    if (accentLightRef.current) {
      accentLightRef.current.intensity = MathUtils.lerp(10, 14, mix);
    }

    if (sunLightRef.current) {
      sunLightRef.current.intensity = MathUtils.lerp(0, 68, mix);
    }

    if (floorMaterialRef.current) {
      floorMaterialRef.current.color.copy(palette.nightFloor.clone().lerp(palette.dayFloor, mix));
    }

    if (sunMaterialRef.current) {
      sunMaterialRef.current.opacity = MathUtils.lerp(0.02, 1, mix);
      sunMaterialRef.current.emissiveIntensity = MathUtils.lerp(0.05, 0.95, mix);
    }

    if (sunGlowMaterialRef.current) {
      sunGlowMaterialRef.current.opacity = MathUtils.lerp(0.01, 0.24, mix);
    }
  });

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 14, 40]} />
      <ambientLight ref={ambientLightRef} intensity={0.7} color="#b8c7ff" />
      <directionalLight ref={directionalLightRef} position={[8, 10, 5]} intensity={1.6} color="#ffffff" />
      <pointLight ref={accentLightRef} position={[0, 6, -6]} intensity={10} distance={36} color="#f59e0b" />
      <pointLight ref={sunLightRef} position={[9, 8, -14]} intensity={0} distance={110} color="#fb923c" />
      <mesh position={[9, 8, -16]}>
        <sphereGeometry args={[11.5, 56, 56]} />
        <meshStandardMaterial
          ref={sunMaterialRef}
          color="#fb923c"
          emissive="#fb923c"
          emissiveIntensity={0.05}
          roughness={0.85}
          transparent
          opacity={0.02}
        />
      </mesh>
      <mesh position={[9, 8, -16]} scale={1.95}>
        <sphereGeometry args={[11.5, 40, 40]} />
        <meshBasicMaterial ref={sunGlowMaterialRef} color="#fdba74" transparent opacity={0.01} />
      </mesh>

      <Stars radius={120} depth={45} count={6000} factor={4} fade speed={0.8} />
      <Sparkles count={90} speed={0.24} opacity={0.75} color={isNightMode ? '#e0e7ff' : '#ffffff'} scale={[28, 10, 28]} size={2.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[26, 96]} />
        <meshStandardMaterial ref={floorMaterialRef} color="#081224" transparent opacity={0.92} />
      </mesh>

      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          isNearest={nearestPlanetId === planet.id || selectedPlanetId === planet.id}
          showLabel={!panelOpen}
          canSelect={cameraInput.canSelect.current}
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

      <Environment preset={isNightMode ? 'night' : 'sunset'} />
    </>
  );
};

const SpaceScene = (props: SpaceSceneProps) => {
  const camera = useMemo(() => ({ position: [0, 4.5, 12] as [number, number, number], fov: 50 }), []);
  const lookX = useRef(0);
  const lookY = useRef(0);
  const isPointerDown = useRef(false);
  const isDragging = useRef(false);
  const canSelect = useRef(true);
  const activePointerType = useRef<string | null>(null);
  const swipeMode = useRef<'none' | 'look' | 'thrust'>('none');
  const dragStart = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      className="space-canvas"
      camera={camera}
      onPointerDown={(event) => {
        isPointerDown.current = true;
        isDragging.current = false;
        canSelect.current = true;
        activePointerType.current = event.pointerType;
        swipeMode.current = 'none';
        dragStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        if (!isPointerDown.current) {
          return;
        }

        const deltaX = event.clientX - dragStart.current.x;
        const deltaY = event.clientY - dragStart.current.y;
        const dragDistance = Math.hypot(deltaX, deltaY);

        if (activePointerType.current === 'touch') {
          if (Math.abs(deltaY) > 42 && Math.abs(deltaY) > Math.abs(deltaX) + 10) {
            swipeMode.current = 'thrust';
            canSelect.current = false;
            props.onTouchCruiseChange(deltaY < 0 ? 'forward' : 'backward');
            lookX.current = 0;
            lookY.current = 0;
            return;
          }

          if (Math.abs(deltaX) > 12) {
            swipeMode.current = 'look';
            isDragging.current = true;
            canSelect.current = false;
            lookX.current = MathUtils.clamp(deltaX / window.innerWidth, -0.45, 0.45) * 2;
            lookY.current = 0;
          }
          return;
        }

        if (dragDistance > 8) {
          isDragging.current = true;
          canSelect.current = false;
        }

        if (!isDragging.current) {
          return;
        }

        lookX.current = MathUtils.clamp(deltaX / window.innerWidth, -0.5, 0.5) * 2;
        lookY.current = MathUtils.clamp(deltaY / window.innerHeight, -0.35, 0.35) * 2;
      }}
      onPointerUp={() => {
        isPointerDown.current = false;
        isDragging.current = false;
        canSelect.current = true;
        activePointerType.current = null;
        swipeMode.current = 'none';
        lookX.current = 0;
        lookY.current = 0;
      }}
      onPointerLeave={() => {
        isPointerDown.current = false;
        isDragging.current = false;
        canSelect.current = true;
        activePointerType.current = null;
        swipeMode.current = 'none';
        lookX.current = 0;
        lookY.current = 0;
      }}
    >
      <SpaceWorld {...props} cameraInput={{ lookX, lookY, isDragging, canSelect }} />
    </Canvas>
  );
};

export default SpaceScene;
