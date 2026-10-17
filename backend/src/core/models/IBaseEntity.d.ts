import { ObjectId } from "mongodb";
import { Document } from 'mongoose';

interface IBaseEntity extends Document {
    _id?: ObjectId;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: ObjectId;
    createdAt: Date;
    updatedBy?: ObjectId;
    updatedAt?: Date;
}