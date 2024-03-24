export interface IAppRouteConfig {
  key: string | number;
  path: string;
  component: React.FC<any> | React.LazyExoticComponent<React.FC<any>>;
  authority?: string[];
}
