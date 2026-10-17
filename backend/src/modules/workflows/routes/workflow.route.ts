import { Router } from 'express';
import { WorkflowRepository } from '../repositories/workflow.repository';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowController } from '../controllers/workflow.controller';

const router = Router();

const repository = new WorkflowRepository();
const service = new WorkflowService(repository);
const controller = new WorkflowController(service);

router.get('/',controller.getAll);
router.get('/:id',controller.getById);
router.post('/',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.delete);

export default router;