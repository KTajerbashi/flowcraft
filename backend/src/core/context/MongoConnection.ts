
import {
  MongoClient,
  Db
} from "mongodb";

export class MongoConnection {
  private static client: MongoClient | null = null;
  private static database: Db | null = null;

  static async connect(uri: string,databaseName: string): Promise<Db> {
    if (this.database) {
      return this.database;
    }

    const client = new MongoClient(uri);

    await client.connect();

    this.client = client;
    this.database = client.db(databaseName);

    return this.database;
  }

  static getDb(): Db {
    if (!this.database) {
      throw new Error(
        "MongoDB has not been initialized."
      );
    }

    return this.database;
  }

  static async disconnect(): Promise<void> {
    await this.client?.close();

    this.client = null;
    this.database = null;
  }
}
