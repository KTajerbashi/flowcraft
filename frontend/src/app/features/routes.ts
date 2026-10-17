import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'workflows',
    loadChildren: () => import('./workflows/routes').then((m) => m.WorkflowsRoutes),
  },
  {
    path: 'designer',
    loadChildren: () => import('./designer/routes').then((m) => m.DesignerRoutes),
  },
  {
    path: 'security',
    loadChildren: () => import('./security/routes').then((m) => m.SecurityRoutes),
  },
];
