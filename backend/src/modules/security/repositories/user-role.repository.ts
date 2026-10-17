import { BaseRepository } from '../../../core/repositories/base.repository';
import {
    IUserRole,
    UserRoleModel
} from '../models/user-role.model';

export class UserRoleRepository
    extends BaseRepository<IUserRole> {

    constructor() {
        super(UserRoleModel);
    }

    async findByUserId(
        userId: string
    ): Promise<IUserRole[]> {

        return UserRoleModel
            .find({ userId })
            .populate('roleId');
    }

    async findByRoleId(
        roleId: string
    ): Promise<IUserRole[]> {

        return UserRoleModel
            .find({ roleId })
            .populate('userId');
    }
}