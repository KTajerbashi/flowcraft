import {
    Document,
    Model,
    UpdateQuery
} from 'mongoose';

type QueryFilter<T> = {
    [key: string]: unknown;
} & Partial<Record<keyof T, unknown>>;

export class BaseRepository<T extends Document> {

    constructor(
        protected readonly model: Model<T>
    ) { }

    async onGetAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async onGetById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async onFindOne(
        filter: QueryFilter<T>
    ): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async onCreate(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async onUpdate(
        id: string,
        data: UpdateQuery<T>
    ): Promise<T | null> {
        return this.model.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        ).exec();
    }

    async onDelete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async onExist(
        filter: QueryFilter<T>
    ): Promise<boolean> {
        const result = await this.model.exists(filter);
        return result !== null;
    }
}