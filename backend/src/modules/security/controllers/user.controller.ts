import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { BaseController } from '../../../core/controllers/base.controller';
import { UserService } from '../services/user.service';

export class UserController extends BaseController<IUser> {

    constructor(
        private readonly userService: UserService
    ) {

        super(userService);
    }

    findByUsername = async (
        req: Request<UsernameParams>,
        res: Response
    ): Promise<void> => {

        try {
            const user = await this.userService.findByUsername(req.params.username);

            res.status(200).json({
                success: true,
                data: user
            });

        } catch {

            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    };
}