import React from 'react';
import { IAppRouteConfig } from './type/approute';

const appsRoute: IAppRouteConfig[] = [
  {
    key: 'appsProject.admin-dashboard',
    path: `/`,
    component: React.lazy(
      () => import('../../../view/Sign-in/index.tsx')
    ),
    authority: ['user'],
  },
  {
    key: 'appsProject.admin-dashboard',
    path: `/test`,
    component: React.lazy(
      () => import('../../../view/Sign-in/index.tsx')
    ),
    authority: ['user'],
  },
];

export default appsRoute;
