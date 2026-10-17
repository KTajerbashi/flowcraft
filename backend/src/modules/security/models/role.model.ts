import mongoose, { Schema } from 'mongoose';
import { IBaseEntity } from '../../../core/models/IBaseEntity';

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
}

const EntitySchema = new Schema<IRole>(
  {

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
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

export const RoleModel = mongoose.model<IRole>('Role', EntitySchema);