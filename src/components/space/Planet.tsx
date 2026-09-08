import { Html } from '@react-three/drei';
import { type ThreeEvent } from '@react-three/fiber';
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

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!canSelect) {
      return;
    }
    onSelect(planet.id);
  };

  return (
    <group position={planet.position}>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[planet.radius, 48, 48]} />
        <meshStandardMaterial color={planet.color} emissive={planet.color} emissiveIntensity={isNearest ? 0.9 : 0.45} roughness={0.85} />
      </mesh>

      <mesh rotation={[Math.PI / 2.75, 0, 0]}>
        <torusGeometry args={[planet.radius + 0.32, 0.045, 12, 96]} />
        <meshBasicMaterial color={planet.accent} transparent opacity={isNearest ? 0.95 : 0.45} />
      </mesh>

      <mesh scale={glowScale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={planet.color} transparent opacity={isNearest ? 0.12 : 0.05} />
      </mesh>

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
