import React from 'react';
import { IAppRouteConfig } from './type/approute';

export const publicRoute: IAppRouteConfig[] = [
  {
    key: 'appsProject.dashboard',
    path: `/`,
    component: React.lazy(() => import('../../../components/auth/Auth.tsx')),
    authority: ['user'],
  },
];

export default publicRoute
