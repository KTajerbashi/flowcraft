import { Router } from 'express';
import { RoleRepository } from '../repositories/role.repository';
import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller';



const router = Router();

const repository = new RoleRepository();
const service = new RoleService(repository);
const controller = new RoleController(service);

router.get(
    '/',
    controller.getAll
);

router.get(
    '/:id',
    controller.getById
);

router.post(
    '/',
    controller.create
);

router.put(
    '/:id',
    controller.update
);

router.delete(
    '/:id',
    controller.delete
);

export default router;