import mongoose, { Schema } from 'mongoose';
import { IBaseEntity } from '../../../core/models/IBaseEntity';

export interface IUser extends IBaseEntity {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const EntitySchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model<IUser>('User', EntitySchema);