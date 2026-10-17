import { BaseService } from '../../../core/services/base.service';
import {
    IUser
} from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';



export class UserService extends BaseService<IUser> {

    constructor(
        private readonly userRepository: UserRepository
    ) {

        super(userRepository);
    }

    async findByUsername(
        username: string
    ): Promise<IUser | null> {

        return this.userRepository.findByUsername(
            username
        );
    }

    async findByEmail(
        email: string
    ): Promise<IUser | null> {

        return this.userRepository.findByEmail(
            email
        );
    }
}