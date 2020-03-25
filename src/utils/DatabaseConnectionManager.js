import mongoose from "mongoose";
import config from "config";
import Log from "./Log";

const log = Log("DatabaseConnectionManager");

let dbUri = config.mongodb.connection;

const connect = async (retry = 3) => {
    if (retry > 0) {
        try {
            log.info(
                `trying to connect to database for the ${
                    ["first", "second", "third"][3 - retry]
                } time`
            );

            await mongoose.connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            log.info("connected");
        } catch (error) {
            log.error("error trying to connect to database.", error);
            setTimeout(async () => {
                const nextRetry = retry - 1;
                await connect(nextRetry);
            }, 5000);
        }
    } else {
        log.info("restart application to try to connect again");
    }
};

const DatabaseConnectionManager = {
    connect,

    // For tests purposes
    setConnectionUri(uri) {
        dbUri = uri;
    },
};

export default DatabaseConnectionManager;
