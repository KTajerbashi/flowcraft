import {
  Document,
  Model,
  UpdateQuery,
} from 'mongoose';

export class BaseRepository<T extends Document> {

  constructor(
    protected readonly model: Model<T>
  ) {}

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findOne(
    filter: FilterQuery<T>
  ): Promise<T | null> {

    return this.model.findOne(filter);
  }

  async create(
    data: Partial<T>
  ): Promise<T> {

    return this.model.create(data);
  }

  async update(
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null> {

    return this.model.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    );
  }

  async delete(
    id: string
  ): Promise<T | null> {

    return this.model.findByIdAndDelete(id);
  }

  async exists(
    filter: FilterQuery<T>
  ): Promise<boolean> {

    const result = await this.model.exists(filter);

    return result !== null;
  }
}