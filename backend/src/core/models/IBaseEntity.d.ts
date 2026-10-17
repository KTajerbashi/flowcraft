import { ObjectId } from "mongodb";
import { Document } from 'mongoose';

interface IBaseEntity extends Document {
    _id?: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}