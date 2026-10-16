import { Routes } from '@angular/router';

export const WorkflowsRoutes: Routes = [
    {
        path: '',
        data: { title: 'Workflows', breadcrumb: 'WorkflowManagement' },
        loadComponent() {
            return import('./pages/workflow-management/workflow-management').then((m) => m.WorkflowManagement);
        },
    },
    {
        path: 'workflow-forms',
        data: { title: 'Workflows', breadcrumb: 'WorkflowForms' },
        loadComponent() {
            return import('./pages/workflow-forms/workflow-forms').then((m) => m.WorkflowForms);
        },
    },
    {
        path: 'workflow-start',
        data: { title: 'Workflows', breadcrumb: 'WorkflowStart' },
        loadComponent() {
            return import('./pages/workflow-start/workflow-start').then((m) => m.WorkflowStart);
        },
    }, {
        path: 'workflow-cartable',
        data: { title: 'Workflows', breadcrumb: 'WorkflowCartable' },
        loadComponent() {
            return import('./pages/workflow-cartable/workflow-cartable').then((m) => m.WorkflowCartable);
        },
    }, {
        path: 'workflow-tracking',
        data: { title: 'Workflows', breadcrumb: 'WorkflowTracking' },
        loadComponent() {
            return import('./pages/workflow-tracking/workflow-tracking').then((m) => m.WorkflowTracking);
        },
    }, {
        path: 'workflow-monitoring',
        data: { title: 'Workflows', breadcrumb: 'WorkflowMonitoring' },
        loadComponent() {
            return import('./pages/workflow-monitoring/workflow-monitoring').then((m) => m.WorkflowMonitoring);
        },
    },
    {
        path: 'workflow-repository',
        data: { title: 'Workflows', breadcrumb: 'WorkflowRepository' },
        loadComponent() {
            return import('./pages/workflow-repository/workflow-repository').then((m) => m.WorkflowRepository);
        },
    },
    {
        path: 'workflow-archive',
        data: { title: 'Workflows', breadcrumb: 'WorkflowArchive' },
        loadComponent() {
            return import('./pages/workflow-archive/workflow-archive').then((m) => m.WorkflowArchive);
        },
    }
];
