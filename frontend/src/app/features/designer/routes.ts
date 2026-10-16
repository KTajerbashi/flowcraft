import { Routes } from '@angular/router';

export const DesignerRoutes: Routes = [

    {
        path: '',
        data: { title: 'DiagramDesigner', breadcrumb: 'DiagramDesigner' },
        loadComponent() {
            return import('./pages/diagram-designer/diagram-designer').then((m) => m.DiagramDesigner);
        },
    },
    {
        path: 'diagram-management',
        data: { title: 'DiagramManagement', breadcrumb: 'DiagramManagement' },
        loadComponent() {
            return import('./pages/diagram-management/diagram-management').then((m) => m.DiagramManagement);
        },
    },
];
