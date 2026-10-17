import { BaseRepository } from "../../../core/repositories/base.repository";
import { IWorkflow, WorkflowModel } from "../models/workflow.model";


export class WorkflowRepository extends BaseRepository<IWorkflow> {

    constructor() {
        super(WorkflowModel);
    }


}