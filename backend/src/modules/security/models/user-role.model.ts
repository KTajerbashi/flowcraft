import mongoose, {
    Document,
    Schema
} from 'mongoose';

export interface IUserRole extends Document {

    userId: mongoose.Types.ObjectId;

    roleId: mongoose.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;
}

const userRoleSchema =
    new Schema<IUserRole>(
        {

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

userRoleSchema.index(
    {
        userId: 1,
        roleId: 1
    },
    {
        unique: true
    }
);

export const UserRoleModel =
    mongoose.model<IUserRole>(
        'UserRole',
        userRoleSchema
    );