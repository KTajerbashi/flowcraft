import { BaseController } from '../../../core/controllers/base.controller';
import { IRole } from '../models/role.model';
import { RoleService } from '../services/role.service';

export class RoleController extends BaseController<IRole> {

  constructor(roleService: RoleService) {
    super(roleService);
  }
}