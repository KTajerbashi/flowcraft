import mongoose, { Schema } from 'mongoose';
import { IBaseEntity } from '../../../core/models/IBaseEntity';

export interface IUserRole extends IBaseEntity {

    userId: mongoose.Types.ObjectId;

    roleId: mongoose.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;
}

const EntitySchema = new Schema<IUserRole>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }

},
    {
        timestamps: true
    }
);

EntitySchema.index(
    {
        userId: 1,
        roleId: 1
    },
    {
        unique: true
    }
);

export const UserRoleModel = mongoose.model<IUserRole>('UserRole', EntitySchema);