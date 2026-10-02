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
    company: 'Equal Experts',
    period: 'Aug 2023 - Present',
    bullets: [
      'Platform and infrastructure work for an HR SaaS platform, across AWS and GCP.',
      // TODO: add specific achievements/metrics once finalized.
    ],
    tech: [
      'AWS',
      'GCP',
      'Terraform',
      'Kubernetes',
      'Helm',
      'ArgoCD',
      'Docker',
      'GitHub Actions',
      'Octopus Deploy',
    ],
  },
  {
    role: 'Senior Consultant',
    company: 'Thoughtworks',
    period: 'Sep 2022 - Aug 2023',
    bullets: [
      'Built RESTful domain APIs for an e-commerce platform, with an event-based system syncing data from multiple sources into a single source of truth.',
      'Led the data pipeline setup, a shared Spring Boot starter library, and performance testing and tuning.',
      'Owned code quality and clean-code practices, drove estimation, and helped analyze architectural decisions in a team of 14.',
    ],
    tech: ['Java 17', 'Spring Boot', 'Kafka', 'ksqlDB', 'AWS (EKS, MSK)', 'Terraform', 'Gradle', 'Jenkins', 'GitHub Actions', 'Gatling'],
  },
  {
    role: 'Consultant',
    company: 'Thoughtworks',
    period: 'Jul 2020 - Aug 2022',
    bullets: [
      'Built and migrated geolocation-based search microservices: store/dealer finder, geocoding, and a localized proxy API.',
      'Enhanced geo-spatial query performance; read-replica autoscaling on RDS raised TPS from 48 to 126.',
      'Built 10+ CloudWatch dashboards from custom metrics to track production trends.',
      'Set up CI/CD in Azure DevOps with performance and integration tests, cutting 5 minutes off pipeline run time; mentored 2 new team members.',
    ],
    tech: ['Java 11', 'Spring Boot', 'jOOQ', 'PostgreSQL/PostGIS', 'AWS (ECS, API Gateway, CloudFormation)', 'Azure Pipelines', 'JMeter', 'Karate'],
  },
  {
    role: 'Graduate Consultant',
    company: 'Thoughtworks',
    period: 'Jun 2019 - Jun 2020',
    bullets: [
      'Migrated an on-prem Cloudera Hadoop cluster to AWS EMR and extended the existing data pipeline.',
      'Put a trained ML model into production in the pipeline and ensured clean input data.',
    ],
    tech: ['Java 8', 'Python', 'Spark', 'Hive', 'Sqoop', 'Oozie', 'AWS (EMR, S3, Lambda)', 'CloudFormation'],
  },
];
