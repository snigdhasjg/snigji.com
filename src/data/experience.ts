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
      'One of 3-4 DevOps engineers owning end-to-end infrastructure design and operations for an HR SaaS platform serving 10+ product teams across AWS, GCP and Azure; also work with cross-functional teams on designs and ADRs.',
      'Support two platform models: multi-tenant and single-app. The two B2B multi-tenant apps run 200+ tenants, each with physically segregated processes.',
      'Champion a cloud-agnostic setup: the same app runs on AWS, GCP and Azure with no cloud-specific dependencies, and I work closely with app teams so any new component is introduced with cloud-native principles in mind.',
      'Manage the full stack as code with Terraform and OpenTofu: cloud infrastructure, Kubernetes, Okta and Datadog. Business users can self-serve new tenants through this setup.',
      'Built reusable Terraform modules and GitHub Actions pipelines now used by all apps.',
      'Set up OpenTelemetry tracing in the applications so requests can be traced in Datadog alongside logs and metrics.',
      'Over the past year, migrated legacy .NET apps to Kubernetes and onboarded new apps onto it, including Python, Next.js, React and Angular workloads.',
    ],
    tech: [
      '.NET',
      'Python',
      'AWS',
      'GCP',
      'Azure',
      'Terraform',
      'OpenTofu',
      'Okta',
      'Datadog',
      'OpenTelemetry',
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
    tech: [
      'Java 17',
      'Spring Boot',
      'Kafka',
      'ksqlDB',
      'AWS (EKS, MSK)',
      'Terraform',
      'Gradle',
      'Jenkins',
      'GitHub Actions',
      'Gatling',
    ],
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
    tech: [
      'Java 11',
      'Spring Boot',
      'jOOQ',
      'PostgreSQL/PostGIS',
      'AWS (ECS, API Gateway, CloudFormation)',
      'Azure Pipelines',
      'JMeter',
      'Karate',
    ],
  },
  {
    role: 'Graduate Consultant',
    company: 'Thoughtworks',
    period: 'Jun 2019 - Jun 2020',
    bullets: [
      'Migrated an on-prem Cloudera Hadoop cluster to AWS EMR and extended the existing data pipeline.',
      'Put a trained ML model into production in the pipeline and ensured clean input data.',
    ],
    tech: [
      'Java 8',
      'Python',
      'Spark',
      'Hive',
      'Sqoop',
      'Oozie',
      'AWS (EMR, S3, Lambda)',
      'CloudFormation',
    ],
  },
];
