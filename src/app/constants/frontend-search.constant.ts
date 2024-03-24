export interface SearchConstantI {
  name: string;
  url: string;
  key: string | number;
  keyword: any[];
}

const frontEndSearchConstant: SearchConstantI[] = [
  {
    name: 'Staff profile',
    url: '/about',
    key: 1,
    keyword: ['sda', 'asd'],
  },
  {
    name: 'Nominee profile',
    url: '/',
    key: 2,
    keyword: ['sda', 'asd'],
  },
  // {
  //   id: 1,
  //   name: 'Health insurance',
  //   url: '/health-insurance',
  //   key: 'health.insurance',
  //   keyword: ['sda', 'asd'],
  // },
  // {
  //   id: 1,
  //   name: 'Transport bill',
  //   url: '/transport-bill',
  //   key: 'transport.bill',
  //   keyword: ['sda', 'asd'],
  // },
  // {
  //   name: 'HR Formats',
  //   url: '/hr-formats',
  //   key: 'hr-formats',
  //   keyword: ['sda', 'asd'],
  // },
  // {
  //   name: 'Circulars',
  //   url: '/circulars',
  //   key: 'circulars',
  //   keyword: ['sda', 'asd'],
  // },
  {
    name: 'Important Contacts',
    url: '/circulars',
    key: 'important-contacts',
    keyword: ['sda', 'asd'],
  },
];

export default frontEndSearchConstant;
