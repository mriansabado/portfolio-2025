import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, Sparkles, Stars } from '@react-three/drei';
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
import { resumeHitSnippets } from '../../data/resume';

interface SpaceSceneProps {
  isNightMode: boolean;
  introActive: boolean;
  panelOpen: boolean;
  selectedPlanetId: PlanetId | null;
  lastClosedPlanetKey: number;
  lastClosedPlanetId: PlanetId | null;
  fireSignal: number;
  touchControls: RocketControlsState;
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
const ASTEROID_COUNT = 10;
const DECOR_DEBRIS_COUNT = 18;
const BULLET_SPEED = 16;
const BULLET_LIFETIME = 1.2;
const ASTEROID_RESPAWN_MARGIN = 17;
const ASTEROID_PLANE_Y_MIN = 0.18;
const ASTEROID_PLANE_Y_MAX = 0.62;

interface AsteroidEntity {
  id: string;
  position: Vector3;
  drift: Vector3;
  radius: number;
  rotationSeed: number;
}

interface DecorDebrisEntity {
  id: string;
  position: Vector3;
  drift: Vector3;
  scale: number;
  radius: number;
  rotationSeed: number;
  tint: string;
  shape: 'box' | 'panel' | 'capsule';
}

interface BulletEntity {
  id: string;
  position: Vector3;
  direction: Vector3;
  age: number;
}

interface HitBurst {
  id: string;
  position: Vector3;
  text: string;
  age: number;
}

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

const createAsteroid = (id: string, planetPositions: Record<PlanetId, Vector3>) => {
  const position = new Vector3();
  let attempts = 0;

  do {
    position.set(
      randomRange(-PLAY_BOUNDS, PLAY_BOUNDS),
      randomRange(ASTEROID_PLANE_Y_MIN, ASTEROID_PLANE_Y_MAX),
      randomRange(-PLAY_BOUNDS, PLAY_BOUNDS)
    );
    attempts += 1;
  } while (
    attempts < 20 &&
    (position.length() < 5.5 || Object.values(planetPositions).some((planetPosition) => position.distanceTo(planetPosition) < 3.6))
  );

  return {
    id,
    position,
    drift: new Vector3(randomRange(-0.3, 0.3), 0, randomRange(-0.28, 0.28)),
    radius: randomRange(0.45, 0.8),
    rotationSeed: Math.random() * Math.PI * 2
  };
};

const createDecorDebris = (id: string, planetPositions: Record<PlanetId, Vector3>): DecorDebrisEntity => {
  const position = new Vector3();
  let attempts = 0;

  do {
    position.set(
      randomRange(-16.5, 16.5),
      randomRange(ASTEROID_PLANE_Y_MIN, ASTEROID_PLANE_Y_MAX),
      randomRange(-16.5, 16.5)
    );
    attempts += 1;
  } while (
    attempts < 20 &&
    (position.length() < 4.8 || Object.values(planetPositions).some((planetPosition) => position.distanceTo(planetPosition) < 3.2))
  );

  const shapes: DecorDebrisEntity['shape'][] = ['box', 'panel', 'capsule'];
  const tints = ['#94a3b8', '#64748b', '#cbd5e1', '#fda4af'];

  return {
    id,
    position,
    drift: new Vector3(randomRange(-0.12, 0.12), 0, randomRange(-0.1, 0.1)),
    scale: randomRange(0.28, 0.7),
    radius: randomRange(0.32, 0.5),
    rotationSeed: Math.random() * Math.PI * 2,
    tint: tints[Math.floor(Math.random() * tints.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)]
  };
};

const SpaceWorld = ({
  isNightMode,
  introActive,
  panelOpen,
  selectedPlanetId,
  lastClosedPlanetKey,
  lastClosedPlanetId,
  fireSignal,
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
  const sunMaterialRef = useRef<MeshStandardMaterial>(null);
  const sunGlowMaterialRef = useRef<MeshBasicMaterial>(null);
  const touchLockRef = useRef<PlanetId | null>(null);
  const themeMixRef = useRef(isNightMode ? 0 : 1);
  const transitionStartRef = useRef(themeMixRef.current);
  const transitionTargetRef = useRef(themeMixRef.current);
  const transitionProgressRef = useRef(1);
  const lastFireSignalRef = useRef(fireSignal);
  const planetPositions = useMemo(
    () =>
      Object.fromEntries(planets.map((planet) => [planet.id, new Vector3(...planet.position)])) as Record<PlanetId, Vector3>,
    []
  );
  const [nearestPlanetId, setNearestPlanetId] = useState<PlanetId | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidEntity[]>(() =>
    Array.from({ length: ASTEROID_COUNT }, (_, index) => createAsteroid(`asteroid-${index}`, planetPositions))
  );
  const [debrisTargets, setDebrisTargets] = useState<DecorDebrisEntity[]>(() =>
    Array.from({ length: DECOR_DEBRIS_COUNT }, (_, index) => createDecorDebris(`decor-${index}`, planetPositions))
  );
  const [bullets, setBullets] = useState<BulletEntity[]>([]);
  const [bursts, setBursts] = useState<HitBurst[]>([]);
  const [planetShotCounts, setPlanetShotCounts] = useState<Record<PlanetId, number>>({
    projects: 0,
    about: 0,
    resume: 0,
    contact: 0
  });
  const palette = useMemo(
    () => ({
      nightBackground: new Color('#020617'),
      dayBackground: new Color('#1e3a8a'),
      nightFog: new Color('#020617'),
      dayFog: new Color('#2563eb'),
      nightAmbient: new Color('#b8c7ff'),
      dayAmbient: new Color('#dbeafe'),
      nightDirectional: new Color('#ffffff'),
      dayDirectional: new Color('#f8fafc')
    }),
    []
  );

  useEffect(() => {
    transitionStartRef.current = themeMixRef.current;
    transitionTargetRef.current = isNightMode ? 0 : 1;
    transitionProgressRef.current = 0;
  }, [isNightMode]);

  useEffect(() => {
    if (fireSignal === lastFireSignalRef.current || panelOpen || introActive) {
      return;
    }

    lastFireSignalRef.current = fireSignal;

    const direction = new Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current)).normalize();
    const spawnPosition = shipPosition.current.clone().add(direction.clone().multiplyScalar(1.15));

    setBullets((current) => [
      ...current,
      {
        id: `bullet-${fireSignal}`,
        position: spawnPosition,
        direction,
        age: 0
      }
    ]);
  }, [fireSignal, introActive, panelOpen]);

  useEffect(() => {
    if (!lastClosedPlanetId) {
      return;
    }

    const planetCenter = planetPositions[lastClosedPlanetId];
    const releaseDirection = shipPosition.current.clone().sub(planetCenter);

    if (releaseDirection.lengthSq() < 0.001) {
      releaseDirection.set(0, 0, 1);
    }

    const closedPlanet = planets.find((planet) => planet.id === lastClosedPlanetId);
    if (!closedPlanet) {
      return;
    }

    shipPosition.current.copy(
      planetCenter.clone().add(releaseDirection.normalize().multiplyScalar(closedPlanet.radius + 2.2))
    );
    velocity.current = 0;
    touchLockRef.current = lastClosedPlanetId;
  }, [lastClosedPlanetId, lastClosedPlanetKey, planetPositions]);

  useFrame(({ camera, scene }, delta) => {
    const turnSpeed = 2.05;
    const baseAcceleration = 11.8;
    const movementLocked = panelOpen || introActive;
    const damping = movementLocked ? 0.86 : 0.95;
    const isTouchCruising = touchControls.forward || touchControls.backward;
    let steerInput = movementLocked ? 0 : (controls.left ? 1 : 0) - (controls.right ? 1 : 0);
    steer.current = steerInput;

    if (!movementLocked) {
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
    if (!introActive) {
      shipPosition.current.add(movement);
    }

    shipPosition.current.x = MathUtils.clamp(shipPosition.current.x, -PLAY_BOUNDS, PLAY_BOUNDS);
    shipPosition.current.z = MathUtils.clamp(shipPosition.current.z, -PLAY_BOUNDS, PLAY_BOUNDS);
    shipPosition.current.y = 0.35 + Math.sin(performance.now() * 0.0018) * 0.07;

    if (introActive) {
      velocity.current = MathUtils.lerp(velocity.current, 0, 1 - Math.pow(0.02, delta));
      yaw.current = MathUtils.lerp(yaw.current, Math.PI, 1 - Math.pow(0.02, delta));
    }

    setAsteroids((currentAsteroids) =>
      currentAsteroids.map((asteroid) => {
        const nextPosition = asteroid.position.clone().addScaledVector(asteroid.drift, delta);

        if (nextPosition.x > ASTEROID_RESPAWN_MARGIN) nextPosition.x = -ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.x < -ASTEROID_RESPAWN_MARGIN) nextPosition.x = ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.z > ASTEROID_RESPAWN_MARGIN) nextPosition.z = -ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.z < -ASTEROID_RESPAWN_MARGIN) nextPosition.z = ASTEROID_RESPAWN_MARGIN;
        nextPosition.y = MathUtils.clamp(nextPosition.y, ASTEROID_PLANE_Y_MIN, ASTEROID_PLANE_Y_MAX);

        return { ...asteroid, position: nextPosition };
      })
    );

    setDebrisTargets((currentDebris) =>
      currentDebris.map((debris) => {
        const nextPosition = debris.position.clone().addScaledVector(debris.drift, delta);

        if (nextPosition.x > ASTEROID_RESPAWN_MARGIN) nextPosition.x = -ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.x < -ASTEROID_RESPAWN_MARGIN) nextPosition.x = ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.z > ASTEROID_RESPAWN_MARGIN) nextPosition.z = -ASTEROID_RESPAWN_MARGIN;
        if (nextPosition.z < -ASTEROID_RESPAWN_MARGIN) nextPosition.z = ASTEROID_RESPAWN_MARGIN;
        nextPosition.y = MathUtils.clamp(nextPosition.y, ASTEROID_PLANE_Y_MIN, ASTEROID_PLANE_Y_MAX);

        return { ...debris, position: nextPosition };
      })
    );

    setBullets((currentBullets) =>
      currentBullets
        .map((bullet) => ({
          ...bullet,
          position: bullet.position.clone().addScaledVector(bullet.direction, BULLET_SPEED * delta),
          age: bullet.age + delta
        }))
        .filter(
          (bullet) =>
            bullet.age < BULLET_LIFETIME &&
            Math.abs(bullet.position.x) < ASTEROID_RESPAWN_MARGIN + 2 &&
            Math.abs(bullet.position.z) < ASTEROID_RESPAWN_MARGIN + 2
        )
    );

    setBursts((currentBursts) =>
      currentBursts
        .map((burst) => ({
          ...burst,
          position: burst.position.clone().add(new Vector3(0, delta * 0.9, 0)),
          age: burst.age + delta
        }))
        .filter((burst) => burst.age < 1.2)
    );

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
    } else if (
      touchLockRef.current &&
      shipPosition.current.distanceTo(planetPositions[touchLockRef.current]) >
        (planets.find((planet) => planet.id === touchLockRef.current)?.radius ?? 0) + SHIP_CONTACT_RADIUS + 1.2
    ) {
      touchLockRef.current = null;
    }

    if (introActive) {
      cameraTarget.current.set(0, 12.5, 15.5);
      camera.position.lerp(cameraTarget.current, 1 - Math.pow(0.001, delta));
      camera.lookAt(0, 0.55, 0);
    } else {
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
    }

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

    if (sunMaterialRef.current) {
      sunMaterialRef.current.opacity = MathUtils.lerp(0.02, 1, mix);
      sunMaterialRef.current.emissiveIntensity = MathUtils.lerp(0.05, 0.95, mix);
    }

    if (sunGlowMaterialRef.current) {
      sunGlowMaterialRef.current.opacity = MathUtils.lerp(0.01, 0.24, mix);
    }
  });

  useEffect(() => {
    if (bullets.length === 0) {
      return;
    }

    const planetHit = planets.find((planet) =>
      bullets.some((bullet) => bullet.position.distanceTo(planetPositions[planet.id]) <= planet.radius + 0.12)
    );

    if (planetHit) {
      const hitBullet = bullets.find((bullet) => bullet.position.distanceTo(planetPositions[planetHit.id]) <= planetHit.radius + 0.12);
      if (!hitBullet) {
        return;
      }

      setBullets((current) => current.filter((bullet) => bullet.id !== hitBullet.id));
      setPlanetShotCounts((current) => ({
        ...current,
        [planetHit.id]: current[planetHit.id] + 1
      }));
      return;
    }

    const asteroidHit = asteroids.find((asteroid) =>
      bullets.some((bullet) => bullet.position.distanceTo(asteroid.position) <= asteroid.radius + 0.22)
    );

    if (asteroidHit) {
      const hitBullet = bullets.find((bullet) => bullet.position.distanceTo(asteroidHit.position) <= asteroidHit.radius + 0.22);
      if (!hitBullet) {
        return;
      }

      setBullets((current) => current.filter((bullet) => bullet.id !== hitBullet.id));
      setAsteroids((current) =>
        current.map((asteroid) =>
          asteroid.id === asteroidHit.id ? createAsteroid(asteroid.id, planetPositions) : asteroid
        )
      );
      setBursts((current) => [
        ...current,
        {
          id: `burst-${asteroidHit.id}-${performance.now()}`,
          position: asteroidHit.position.clone(),
          text: resumeHitSnippets[Math.floor(Math.random() * resumeHitSnippets.length)],
          age: 0
        }
      ]);
      return;
    }

    const debrisHit = debrisTargets.find((debris) =>
      bullets.some((bullet) => bullet.position.distanceTo(debris.position) <= debris.radius + 0.2)
    );

    if (!debrisHit) {
      return;
    }

    const hitBullet = bullets.find((bullet) => bullet.position.distanceTo(debrisHit.position) <= debrisHit.radius + 0.2);
    if (!hitBullet) {
      return;
    }

    setBullets((current) => current.filter((bullet) => bullet.id !== hitBullet.id));
    setDebrisTargets((current) =>
      current.map((debris) => (debris.id === debrisHit.id ? createDecorDebris(debris.id, planetPositions) : debris))
    );
    setBursts((current) => [
      ...current,
      {
        id: `burst-${debrisHit.id}-${performance.now()}`,
        position: debrisHit.position.clone(),
        text: resumeHitSnippets[Math.floor(Math.random() * resumeHitSnippets.length)],
        age: 0
      }
    ]);
  }, [asteroids, bullets, debrisTargets, planetPositions]);

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

      <Stars radius={140} depth={55} count={8500} factor={4.8} fade speed={0.8} />
      <Sparkles count={160} speed={0.24} opacity={0.75} color="#eef2ff" scale={[34, 12, 34]} size={2.3} />
      <Sparkles count={70} speed={0.18} opacity={0.28} color="#fca5a5" scale={[30, 8, 30]} size={3.6} />
      <Sparkles count={120} speed={0.12} opacity={0.18} color="#fde68a" scale={[40, 14, 40]} size={1.65} />

      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          isNearest={nearestPlanetId === planet.id || selectedPlanetId === planet.id}
          shotPulse={planetShotCounts[planet.id]}
          showLabel={!panelOpen}
          canSelect={cameraInput.canSelect.current}
          onSelect={onPlanetSelect}
        />
      ))}

      {debrisTargets.map((debris) => (
        <group
          key={debris.id}
          position={[debris.position.x, debris.position.y, debris.position.z]}
          rotation={[debris.rotationSeed * 0.5, debris.rotationSeed, debris.rotationSeed * 0.35]}
        >
          {debris.shape === 'box' ? (
            <mesh scale={[debris.scale * 1.5, debris.scale * 0.5, debris.scale * 0.7]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={debris.tint} roughness={0.88} metalness={0.32} transparent opacity={0.45} />
            </mesh>
          ) : null}
          {debris.shape === 'panel' ? (
            <mesh scale={[debris.scale * 1.8, debris.scale * 0.16, debris.scale]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={debris.tint} roughness={0.92} metalness={0.18} transparent opacity={0.36} />
            </mesh>
          ) : null}
          {debris.shape === 'capsule' ? (
            <mesh scale={[debris.scale, debris.scale, debris.scale]}>
              <capsuleGeometry args={[0.18, 0.52, 4, 10]} />
              <meshStandardMaterial color={debris.tint} roughness={0.82} metalness={0.24} transparent opacity={0.42} />
            </mesh>
          ) : null}
        </group>
      ))}

      {asteroids.map((asteroid) => (
        <group key={asteroid.id} position={[asteroid.position.x, asteroid.position.y, asteroid.position.z]}>
          <mesh rotation={[asteroid.rotationSeed, asteroid.rotationSeed * 0.5, asteroid.rotationSeed * 0.75]}>
            <icosahedronGeometry args={[asteroid.radius, 0]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.95} metalness={0.08} />
          </mesh>
        </group>
      ))}

      {bullets.map((bullet) => (
        <mesh key={bullet.id} position={[bullet.position.x, bullet.position.y, bullet.position.z]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      ))}

      {bursts.map((burst) => {
        const progress = Math.min(burst.age / 1.2, 1);
        const scale = 1 + progress * 1.35;

        return (
          <group key={burst.id} position={[burst.position.x, burst.position.y, burst.position.z]}>
            <mesh scale={[scale, scale, scale]}>
              <sphereGeometry args={[0.22, 18, 18]} />
              <meshBasicMaterial color="#fb923c" transparent opacity={Math.max(0, 0.45 - progress * 0.45)} />
            </mesh>
            <Html position={[0.75, 0.4, 0]} center>
              <div className="space-hit-snippet">{burst.text}</div>
            </Html>
          </group>
        );
      })}

      <RocketShip
        positionRef={shipPosition}
        yawRef={yaw}
        velocityRef={velocity}
        steerRef={steer}
        isNightMode={isNightMode}
      />

      <Environment preset="sunset" />
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
        lookX.current = 0;
        lookY.current = 0;
      }}
      onPointerLeave={() => {
        isPointerDown.current = false;
        isDragging.current = false;
        canSelect.current = true;
        activePointerType.current = null;
        lookX.current = 0;
        lookY.current = 0;
      }}
    >
      <SpaceWorld {...props} cameraInput={{ lookX, lookY, isDragging, canSelect }} />
    </Canvas>
  );
};

export default SpaceScene;
