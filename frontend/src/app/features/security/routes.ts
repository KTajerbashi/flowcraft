import { Routes } from '@angular/router';

export const SecurityRoutes: Routes = [

    {
        path: 'users',
        data: { title: 'UserManagement', breadcrumb: 'UserManagement' },
        loadComponent() {
            return import('./pages/user-management/user-management').then((m) => m.UserManagement);
        },
    },

    {
        path: 'roles',
        data: { title: 'RoleManagement', breadcrumb: 'RoleManagement' },
        loadComponent() {
            return import('./pages/role-management/role-management').then((m) => m.RoleManagement);
        },
    },

    {
        path: 'profile',
        data: { title: 'Profile', breadcrumb: 'Profile' },
        loadComponent() {
            return import('./pages/profile/profile').then((m) => m.Profile);
        },
    },

];
