export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: 'Cloud',
    items: ['AWS (EKS, ECS, RDS, MSK, S3, Lambda, IAM, VPC)', 'GCP (GKE, Certificate Manager)', 'Cloudflare'],
  },
  {
    label: 'Infrastructure as Code',
    items: ['Terraform', 'CloudFormation'],
  },
  {
    label: 'Containers & Orchestration',
    items: ['Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'Gateway API'],
  },
  {
    label: 'CI/CD',
    items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Octopus Deploy'],
  },
  {
    label: 'Backend',
    items: ['Java', 'Spring Boot', 'Quarkus', 'Python', 'Go', 'REST APIs', 'Microservices'],
  },
  {
    label: 'Data & Streaming',
    items: ['Kafka', 'ksqlDB', 'Kafka Connect', 'Schema Registry', 'PostgreSQL/PostGIS', 'Spark'],
  },
  {
    label: 'Testing',
    items: ['JUnit', 'TestNG', 'Pytest', 'Gatling', 'JMeter'],
  },
];
