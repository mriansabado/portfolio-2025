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
    type: 'iOS App',
    description:
      'A planner-first app for freelancers and service pros who need their calendar, notes, client context, and invoicing details in one calm place.',
    technologies: ['Expo', 'React Native', 'iOS', 'iPad'],
    liveUrl: '#',
    ctaLabel: 'In Development',
    status: 'Currently building'
  },
  {
    title: 'PocketSay',
    type: 'iOS App',
    description:
      'A simple communication app for those moments when being seen matters more than being heard. Large text, fast controls, offline use, and live on the App Store.',
    technologies: ['React Native', 'Lottie', 'iOS', 'App Store'],
    liveUrl: 'https://pocket-say-support.vercel.app/',
    ctaLabel: 'Download PocketSay',
    status: 'Live on the App Store'
  },
  {
    title: 'Postachio',
    type: 'Web App',
    description:
      'A content-writing product built to make publishing easier when the blank page is the bottleneck, with a stronger focus on speed, consistency, and usable output.',
    technologies: ['React', 'TypeScript', 'Firebase', 'AI'],
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
      'I like interfaces that feel crisp, readable, and confidently put together across real screen sizes, not just Dribbble-sized ones.',
    note: 'React, Vue, CMS work, reusable components, and the cleanup work that makes a product feel stable.',
    icon: <FaReact className="h-5 w-5" />
  },
  {
    title: 'Mobile product instinct',
    eyebrow: 'React Native + iOS',
    description:
      'I enjoy the constraint of small screens. It forces better hierarchy, clearer UX decisions, and fewer lazy interface choices.',
    note: 'PocketSay is live today, and Tasqly leans into workflow design for people juggling clients, sessions, and admin work.',
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
    note: 'AWS, Firebase, Vercel, app submission, and the “someone has to own this” parts of product work.',
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

export const socialLinks: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/mriansabado' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/mriansabado/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ian-sabado-658828b2/' }
];
