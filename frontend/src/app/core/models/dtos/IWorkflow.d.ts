interface IWorkflow extends IBaseDTO {
    name: string;
    status: 'Active' | 'Draft' | 'Archived';
    updatedAt: string | Date;
}