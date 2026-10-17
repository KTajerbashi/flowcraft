import { Document } from 'mongoose';
import { BaseRepository } from '../repositories/base.repository';

export class BaseService<T extends Document> {

    constructor(
        protected readonly repository: BaseRepository<T>
    ) { }

    async getAll(): Promise<T[]> {
        return this.repository.onGetAll();
    }

    async getById(id: string): Promise<T | null> {
        return this.repository.onGetById(id);
    }

    async create(data: Partial<T>): Promise<T> {
        return this.repository.onCreate(data);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.repository.onUpdate(id, data);
    }

    async delete(id: string): Promise<T | null> {
        return this.repository.onDelete(id);
    }
}