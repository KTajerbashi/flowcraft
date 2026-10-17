import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get('/',controller.getAll);
router.get('/:id',controller.getById);
router.get('/username/:username',controller.findByUsername);
router.post('/',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.delete);

export default router;