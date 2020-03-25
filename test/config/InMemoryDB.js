import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Log from "../../src/utils/Log";
import DatabaseConnectionManager from "../../src/utils/DatabaseConnectionManager";

const log = Log("InMemoryDb");

const mongod = new MongoMemoryServer();

export const connect = async () => {
    try {
        const uri = await mongod.getConnectionString("test");

        DatabaseConnectionManager.setConnectionUri(uri);

        await DatabaseConnectionManager.connect();
    } catch (error) {
        log.error("error trying to get mongod connection string.", error);
    }
};

export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

export const clearDatabase = async () => {
    const { collections } = mongoose.connection;

    const deleteFromCollections = Object.keys(collections).map((key) =>
        collections[key].deleteMany()
    );
    await Promise.all(deleteFromCollections);
};
