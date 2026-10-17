import { Router } from 'express';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { UserRoleService } from '../services/user-role.service';
import { UserRoleController } from '../controllers/user-role.controller';

const router = Router();

const repository = new UserRoleRepository();
const service = new UserRoleService(repository);
const controller = new UserRoleController(service);

router.get(
  '/',
  controller.getAll
);

router.get(
  '/:id',
  controller.getById
);

router.get(
  '/user/:userId',
  controller.getUserRoles
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