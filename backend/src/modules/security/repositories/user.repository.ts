import { BaseRepository } from '../../../core/repositories/base.repository';
import {
    IUser,
    UserModel
} from '../models/user.model';

export class UserRepository extends BaseRepository<IUser> {

    constructor() {
        super(UserModel);
    }

    async findByUsername(
        username: string
    ): Promise<IUser | null> {

        return this.onFindOne({username});
    }

    async findByEmail(
        email: string
    ): Promise<IUser | null> {

        return this.onFindOne({email});
    }
}