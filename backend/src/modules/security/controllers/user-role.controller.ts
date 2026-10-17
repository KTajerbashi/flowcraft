import { Request, Response } from 'express';

import { IUserRole } from '../models/user-role.model';
import { BaseController } from '../../../core/controllers/base.controller';
import { UserRoleService } from '../services/user-role.service';


export class UserRoleController
    extends BaseController<IUserRole> {

    constructor(
        private readonly userRoleService: UserRoleService
    ) {
        super(userRoleService);
    }

    getUserRoles = async (
        req: Request<UserIdParams>,
        res: Response
    ): Promise<void> => {

        try {

            const data =
                await this.userRoleService.getUserRoles(
                    req.params.userId
                );

            res.status(200).json({
                success: true,
                data
            });

        } catch {

            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    };
}