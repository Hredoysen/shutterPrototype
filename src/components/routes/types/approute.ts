import { FC, LazyExoticComponent } from 'react';

export interface IAppRoute {
  component: FC<any> | LazyExoticComponent<FC<any>>;
}
