import type { ReactNode } from 'react';
import { FaEnvelope, FaFolderOpen, FaIdBadge, FaUserAstronaut } from 'react-icons/fa';

export type PlanetId = 'projects' | 'about' | 'resume' | 'contact';

export interface PlanetDefinition {
  id: PlanetId;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  radius: number;
  /** Primary body color (oceans / base rock / gas) */
  color: string;
  /** Atmosphere / ring highlight */
  accent: string;
  /** Continents, storms, or ice veins */
  land?: string;
  icon: ReactNode;
}

export const planets: PlanetDefinition[] = [
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'What I have shipped',
    description: 'A compact system with the products, platforms, and real-world context behind the work.',
    position: [5.6, 0.55, -5.6],
    radius: 1.7,
    color: '#9a3412',
    accent: '#fb7185',
    land: '#c2410c',
    icon: <FaFolderOpen />
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'How I build',
    description: 'A strengths planet covering frontend craft, product thinking, and a warm delivery style.',
    position: [-5.6, 0.45, -5.6],
    radius: 1.85,
    color: '#4c1d95',
    accent: '#c4b5fd',
    land: '#7c3aed',
    icon: <FaUserAstronaut />
  },
  {
    id: 'resume',
    title: 'Resume',
    subtitle: 'Highlights and fit',
    description: 'A quick recruiter-friendly view of role focus, experience, specialties, and how to request the full resume.',
    position: [-5.6, 0.8, 5.6],
    radius: 1.5,
    color: '#0c4a6e',
    accent: '#7dd3fc',
    land: '#38bdf8',
    icon: <FaIdBadge />
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Reach out',
    description: 'Ways to connect, plus the corners of the internet where I show my work from San Diego with Hawaii roots.',
    position: [5.6, 0.35, 5.6],
    radius: 1.45,
    color: '#1e3a8a',
    accent: '#86efac',
    land: '#15803d',
    icon: <FaEnvelope />
  }
];
