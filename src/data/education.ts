export interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  grade?: string;
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Technology (B.Tech.)',
    field: 'Electronics and Communication Engineering',
    institution: 'Netaji Subhash Engineering College',
    period: 'Jul 2015 - Jun 2019',
    grade: 'CGPA 7.98',
  },
];
