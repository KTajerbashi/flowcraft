import { BaseRepository } from '../../../core/repositories/base.repository';
import {
    IRole,
    RoleModel
} from '../models/role.model';

export class RoleRepository
    extends BaseRepository<IRole> {

    constructor() {
        super(RoleModel);
    }

    async findByName(
        name: string
    ): Promise<IRole | null> {

        return this.onFindOne({ name });
    }
}