import { Routes } from '@angular/router';

export const SecurityRoutes: Routes = [

    {
        path: '',
        data: { title: 'UserManagement', breadcrumb: 'UserManagement' },
        loadComponent() {
            return import('./pages/user-management/user-management').then((m) => m.UserManagement);
        },
    },
    {
        path: 'role-management',
        data: { title: 'RoleManagement', breadcrumb: 'RoleManagement' },
        loadComponent() {
            return import('./pages/role-management/role-management').then((m) => m.RoleManagement);
        },
    },
];
