import { BaseController } from '../../../core/controllers/base.controller';
import { IWorkflow } from '../models/workflow.model';
import { WorkflowService } from '../services/workflow.service';

export class WorkflowController extends BaseController<IWorkflow> {

  constructor(WorkflowService: WorkflowService) {
    super(WorkflowService);
  }
}