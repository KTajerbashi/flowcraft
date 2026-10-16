import { Routes } from '@angular/router';

export const DesignerRoutes: Routes = [
    {
        path: '',
        data: { title: 'Designer', breadcrumb: 'DiagramDesigner' },
        loadComponent() {
            return import('./pages/diagram-designer/diagram-designer').then((m) => m.DiagramDesigner);
        },
    },
];
