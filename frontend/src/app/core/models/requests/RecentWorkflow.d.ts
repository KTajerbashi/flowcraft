interface RecentWorkflow {
    id: string;
    name: string;
    description: string;
    status: 'Draft' | 'Published';
    updatedAt: string;
}