import express from "express";
import cors from "cors";
import config from "config";
import Log from "./utils/Log";
import router from "./routes";
import DatabaseConnectionManager from "./utils/DatabaseConnectionManager";

const log = Log("server");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(config.server.port, async () => {
    await DatabaseConnectionManager.connect();

    log.info(
        `${process.env.NODE_ENV} :: listening to port ${config.server.port}`
    );
});
