import loadable from '@loadable/component';

export const Dashboard = loadable(() => import('./Dashboard'), {
  resolveComponent: (components) => components.Dashboard,
});
