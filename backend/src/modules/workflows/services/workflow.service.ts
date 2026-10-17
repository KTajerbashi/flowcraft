import { BaseService } from '../../../core/services/base.service';
import { IWorkflow } from '../models/workflow.model';
import { WorkflowRepository } from '../repositories/workflow.repository';



export class WorkflowService extends BaseService<IWorkflow> {

    constructor(
        private readonly WorkflowRepository: WorkflowRepository
    ) {

        super(WorkflowRepository);
    }


}