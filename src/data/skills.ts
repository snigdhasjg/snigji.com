// TODO: trim/extend to match your real experience.
export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: 'Cloud & Platform',
    items: ['AWS', 'Cloudflare', 'GCP'],
  },
  {
    label: 'Infrastructure as Code',
    items: ['Terraform', 'Pulumi', 'Ansible'],
  },
  {
    label: 'Containers & Orchestration',
    items: ['Docker', 'Kubernetes', 'Helm'],
  },
  {
    label: 'CI/CD',
    items: ['GitHub Actions', 'GitLab CI', 'ArgoCD'],
  },
  {
    label: 'Observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'REST/GraphQL APIs'],
  },
];
