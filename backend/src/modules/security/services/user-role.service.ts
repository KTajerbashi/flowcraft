import { BaseService } from '../../../core/services/base.service';
import { IUserRole } from '../models/user-role.model';
import { UserRoleRepository } from '../repositories/user-role.repository';


export class UserRoleService extends BaseService<IUserRole> {

    constructor(private readonly userRoleRepository: UserRoleRepository) { super(userRoleRepository); }

    async getUserRoles(
        userId: string
    ): Promise<IUserRole[]> {

        return this.userRoleRepository
            .findByUserId(userId);
    }

    async getRoleUsers(
        roleId: string
    ): Promise<IUserRole[]> {

        return this.userRoleRepository
            .findByRoleId(roleId);
    }
}