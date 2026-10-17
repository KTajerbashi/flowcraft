import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IRole extends Document {

  name: string;

  description?: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
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

export const RoleModel =
  mongoose.model<IRole>(
    'Role',
    roleSchema
  );