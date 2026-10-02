export interface Project {
  name: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    name: 'cloud-fusion',
    description:
      'Unified CLI for day-to-day AWS and GCP operations (formerly aws-fusion), published on PyPI.',
    tech: ['Python', 'AWS', 'GCP'],
    links: [
      { label: 'Repo', href: 'https://github.com/snigdhasjg/cloud-fusion' },
      { label: 'PyPI', href: 'https://pypi.org/project/cloud-fusion' },
    ],
  },
  {
    name: 'gke-gateway-cert-aggregator',
    description:
      'A Kubernetes controller for GKE Gateway that lets app teams declare GCP Certificate Manager ' +
      "certs on their own HTTPRoute, aggregating those declarations onto the shared Gateway's HTTPS " +
      'listener. Image and Helm chart are published as public GHCR packages.',
    tech: ['Go', 'Kubernetes', 'GKE', 'Helm'],
    links: [{ label: 'Repo', href: 'https://github.com/snigdhasjg/gke-gateway-cert-aggregator' }],
  },
  {
    name: 'url-unshortener',
    description:
      'Self-hosted URL unshortener: given a shortened URL, walks the redirect chain and reports ' +
      'every hop and the final destination, under a 5-second ceiling.',
    tech: ['Java', 'Quarkus'],
    links: [{ label: 'Repo', href: 'https://github.com/snigdhasjg/url-unshortener' }],
  },
];
