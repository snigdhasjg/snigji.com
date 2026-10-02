// TODO: replace with your real work history, most recent first.
export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    role: 'DevOps Engineer',
    company: 'TODO: Company',
    period: 'TODO: Mon YYYY — Present',
    bullets: [
      'TODO: Owned CI/CD pipelines for N services, cutting deploy time from X to Y.',
      'TODO: Migrated infrastructure to IaC (Terraform/Pulumi), removing manual provisioning.',
      'TODO: Built observability stack (metrics/logs/traces) that reduced MTTR by Z%.',
    ],
    tech: ['AWS', 'Terraform', 'Kubernetes', 'GitHub Actions'],
  },
  {
    role: 'Backend Developer',
    company: 'TODO: Company',
    period: 'TODO: Mon YYYY — Mon YYYY',
    bullets: [
      'TODO: Designed and shipped REST/GraphQL APIs used by N clients.',
      'TODO: Owned a service handling X requests/day with Y% uptime.',
    ],
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
  },
];
