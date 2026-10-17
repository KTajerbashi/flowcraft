import { BaseService } from '../../../core/services/base.service';
import { IRole } from '../models/role.model';
import { RoleRepository } from '../repositories/role.repository';


export class RoleService
    extends BaseService<IRole> {

    constructor(
        private readonly roleRepository: RoleRepository
    ) {

        super(roleRepository);
    }

    async findByName(
        name: string
    ): Promise<IRole | null> {

        return this.roleRepository.findByName(
            name
        );
    }
}