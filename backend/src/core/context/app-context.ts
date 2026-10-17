import mongoose from 'mongoose';

export interface IAppContext {
  db: typeof mongoose;
}

export class AppContext implements IAppContext {

  public db = mongoose;

  constructor() {
  }

  async connect(): Promise<void> {

    const mongoUri = process.env['MONGO_URI'];

    if (!mongoUri) {
      throw new Error('MONGO_URI is not configured.');
    }

    await this.db.connect(mongoUri);

    console.log('MongoDB connected successfully.');
  }

  async disconnect(): Promise<void> {
    await this.db.disconnect();

    console.log('MongoDB disconnected.');
  }
}