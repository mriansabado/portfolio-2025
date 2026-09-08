import type { ReactNode } from 'react';
import { FaEnvelope, FaFolderOpen, FaIdBadge, FaUserAstronaut } from 'react-icons/fa';

export type PlanetId = 'intro' | 'projects' | 'about' | 'resume' | 'contact';

export interface PlanetDefinition {
  id: PlanetId;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  radius: number;
  color: string;
  accent: string;
  icon: ReactNode;
}

export const planets: PlanetDefinition[] = [
  {
    id: 'intro',
    title: 'Launch Bay',
    subtitle: 'Get oriented',
    description: 'A quick intro to the world and what each destination covers.',
    position: [0, 0.35, -4.6],
    radius: 1.35,
    color: '#f59e0b',
    accent: '#fcd34d',
    icon: <FaUserAstronaut />
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'What I have shipped',
    description: 'A compact system with the products, platforms, and real-world constraints behind the work.',
    position: [4.8, 0.55, -1.9],
    radius: 1.7,
    color: '#fb7185',
    accent: '#fecdd3',
    icon: <FaFolderOpen />
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'How I build',
    description: 'A strengths planet covering frontend craft, product thinking, and delivery style.',
    position: [-4.8, 0.45, -1.9],
    radius: 1.85,
    color: '#8b5cf6',
    accent: '#ddd6fe',
    icon: <FaUserAstronaut />
  },
  {
    id: 'resume',
    title: 'Resume',
    subtitle: 'Highlights and fit',
    description: 'A quick recruiter-friendly view of role focus, experience, and specialties.',
    position: [-2.4, 0.8, 4.3],
    radius: 1.5,
    color: '#38bdf8',
    accent: '#bae6fd',
    icon: <FaIdBadge />
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Reach out',
    description: 'Ways to connect, plus the corners of the internet where I show my work.',
    position: [4.2, 0.35, 4.5],
    radius: 1.45,
    color: '#22c55e',
    accent: '#bbf7d0',
    icon: <FaEnvelope />
  }
];
