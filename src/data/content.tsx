import { FaAws, FaPenNib, FaReact } from 'react-icons/fa';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { RiSparkling2Line } from 'react-icons/ri';
import type { ReactNode } from 'react';

export interface ProjectEntry {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  ctaLabel: string;
  status: string;
}

export interface StrengthEntry {
  title: string;
  eyebrow: string;
  description: string;
  note: string;
  icon: ReactNode;
}

export interface ContactLink {
  label: string;
  href: string;
}

export const projects: ProjectEntry[] = [
  {
    title: 'Tasqly',
    type: 'Apple App',
    description:
      'A planner-first workspace for freelancers, tutors, creatives, and other independent workers, built in Swift for the Apple ecosystem with iPhone, iPad, and desktop support, secure iCloud storage, and cloud sync across devices with no ads or subscriptions.',
    technologies: ['Swift', 'iOS', 'iPadOS', 'macOS', 'iCloud'],
    liveUrl: 'https://apps.apple.com/us/app/tasqly/id6761040872',
    ctaLabel: 'View Tasqly',
    status: 'Live on the App Store'
  },
  {
    title: 'PocketSay',
    type: 'Mobile App',
    description:
      'A simple communication app for those moments when being seen matters more than being heard, built with React Native and Expo to work across Android and Apple devices.',
    technologies: ['React Native', 'Expo', 'iOS', 'Android'],
    liveUrl: 'https://pocket-say-support.vercel.app/',
    ctaLabel: 'Download PocketSay',
    status: 'Live on the App Store'
  },
  {
    title: 'Postachio',
    type: 'Web App',
    description:
      'A web app that helps optimize text, ideas, and promotions for stronger social media performance and better SEO.',
    technologies: ['React', 'Vercel', 'Firebase', 'AI'],
    liveUrl: 'https://postachio.app/',
    ctaLabel: 'Try Postachio',
    status: 'Built from the product side'
  }
];

export const strengths: StrengthEntry[] = [
  {
    title: 'Frontend craft',
    eyebrow: 'Production UI',
    description:
      'I like interfaces that feel crisp, readable, and welcoming across real devices, not just perfect screenshots.',
    note: 'React, Vue, reusable component systems, CMS work, and the cleanup passes that make a product feel steady.',
    icon: <FaReact className="h-5 w-5" />
  },
  {
    title: 'Mobile product instinct',
    eyebrow: 'React Native + iOS',
    description:
      'I enjoy the constraint of small screens because it pushes better hierarchy, clearer UX choices, and less fluff.',
    note: 'PocketSay and Tasqly both come from that mindset: practical mobile tools that try to feel friendly the second you open them.',
    icon: <MdOutlinePhoneIphone className="h-5 w-5" />
  },
  {
    title: 'Automation with taste',
    eyebrow: 'Useful > flashy',
    description:
      'I care about tools that save people time while still feeling clear, helpful, and easy to use.',
    note: 'The good version of automation is boring in the best way: fewer repetitive steps, clearer output, and less friction for the team.',
    icon: <RiSparkling2Line className="h-5 w-5" />
  },
  {
    title: 'Shipping mindset',
    eyebrow: 'Get it live',
    description:
      'I am comfortable following the work past the UI layer into deployment, content systems, production issues, and last-mile details.',
    note: 'AWS, Vercel, Firebase, app submission, and the "someone has to own this" parts of product work.',
    icon: <FaAws className="h-5 w-5" />
  },
  {
    title: 'Taste and storytelling',
    eyebrow: 'Design-aware',
    description:
      'I pay attention to spacing, language, motion, and visual rhythm because users notice when a product feels assembled versus designed.',
    note: 'Good frontend is part engineering, part editing. The details either support the idea or quietly fight it.',
    icon: <FaPenNib className="h-5 w-5" />
  }
];

export const contactSummary = {
  email: 'mriansabado@gmail.com',
  phone: '415-971-6114',
  location: 'San Diego, CA'
};

export const personalSummary = {
  greeting: 'Aloha, I’m Ian.',
  locationLine: 'Born and raised in Hawaii, now building from San Diego.',
  intro:
    'I am a frontend developer building warm, polished web and mobile products with strong React, Vue, React Native, AWS, and Vercel experience.',
  voiceLine:
    'The goal is simple: make useful software feel clear, human, and thoughtfully put together.'
};

export const socialLinks: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/mriansabado' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/mriansabado/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ian-sabado-658828b2/' }
];
