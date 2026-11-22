export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: 'Cloud (multi-cloud)',
    items: ['AWS (EKS, ECS, RDS, MSK, S3, Lambda, IAM, VPC)', 'GCP (GKE)', 'Azure'],
  },
  {
    label: 'Infrastructure as Code',
    items: ['Terraform', 'OpenTofu', 'CloudFormation', 'Azure Bicep'],
  },
  {
    label: 'Containers & Orchestration',
    items: ['Docker', 'Kubernetes', 'Helm', 'Gateway API'],
  },
  {
    label: 'CI/CD & GitOps',
    items: ['GitHub Actions', 'ArgoCD', 'Jenkins', 'Azure DevOps', 'Octopus Deploy'],
  },
  {
    label: 'Observability',
    items: ['Datadog', 'OpenTelemetry', 'CloudWatch'],
  },
  {
    label: 'Backend',
    items: ['Java', 'Spring Boot','Python', 'Go', 'REST APIs', 'Microservices'],
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
