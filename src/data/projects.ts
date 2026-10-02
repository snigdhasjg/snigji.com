// TODO: replace with your real projects.
export interface Project {
  name: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    name: 'snigji.com',
    description:
      'This site — a static, near-zero-JS Astro portfolio deployed to Cloudflare Workers ' +
      'Static Assets, built to also serve OIDC issuer discovery for a personal Okta tenant.',
    tech: ['Astro', 'Cloudflare Workers', 'TypeScript'],
    links: [{ label: 'Source', href: 'https://github.com/TODO/snigji.com' }],
  },
  {
    name: 'TODO: Project name',
    description: 'TODO: One or two sentences on what it does and why it matters.',
    tech: ['TODO'],
    links: [{ label: 'Repo', href: 'https://github.com/TODO' }],
  },
];
