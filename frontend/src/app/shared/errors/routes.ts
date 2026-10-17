import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  },

  {
    path: '500',
    loadComponent: () => import('./server-error/server-error').then((m) => m.ServerError),
  },

  {
    path: '401',
    loadComponent: () => import('./un-authorize/un-authorize').then((m) => m.UnAuthorize),
  },

  {
    path: '',
    redirectTo: '404',
    pathMatch: 'full',
  },
];
