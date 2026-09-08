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
  color: string;
  accent: string;
  icon: ReactNode;
}

export const planets: PlanetDefinition[] = [
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'What I have shipped',
    description: 'A compact system with the products, platforms, and real-world constraints behind the work.',
    position: [5.6, 0.55, -5.6],
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
    position: [-5.6, 0.45, -5.6],
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
    position: [-5.6, 0.8, 5.6],
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
    position: [5.6, 0.35, 5.6],
    radius: 1.45,
    color: '#22c55e',
    accent: '#bbf7d0',
    icon: <FaEnvelope />
  }
];
