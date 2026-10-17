import mongoose, {
    Document,
    Schema
} from 'mongoose';
import { IBaseEntity } from '../../../core/models/IBaseEntity';

export interface IWorkflow extends IBaseEntity {
    name: string;
    description: string;
    status: WorkflowStatusType;
    bpmnXml: string;
}

const EntitySchema = new Schema<IWorkflow>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        status: {
            type: Number,
            required: true
        },

        bpmnXml: {
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

export const WorkflowModel = mongoose.model<IWorkflow>('workflows', EntitySchema);
