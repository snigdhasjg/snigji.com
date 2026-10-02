export interface Publication {
  title: string;
  venue: string;
  date: string;
  summary: string;
  links?: { label: string; href: string }[];
}

export const publications: Publication[] = [
  {
    title: 'An Approach to Geometric Modelling Using Genetic Programming',
    venue: 'Springer',
    date: 'Feb 2021',
    summary:
      'Derived the Pythagorean theorem from the measurements of right-angled triangles using a ' +
      'data-driven approach (symbolic regression with genetic programming) instead of a ' +
      'classical geometric proof.',
    links: [
      {
        label: 'Paper',
        href: 'https://link.springer.com/chapter/10.1007/978-981-15-8366-7_13',
      },
      { label: 'Code', href: 'https://github.com/snigdhasjg/Pythagorean-Triplate' },
    ],
  },
];
