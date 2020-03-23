import debug from "debug";

const log = debug("app");

class Log {
    constructor(namespace, infoLog, errorLog) {
        this.namespace = namespace;
        this.infoLog = infoLog;
        this.errorLog = errorLog;
    }

    info(message, ...args) {
        this.infoLog(`C=${this.namespace}, ${message}`, ...args);
    }

    error(message, ...args) {
        this.errorLog(`C=${this.namespace}, ${message}`, ...args);
    }
}

const init = (source) => {
    const errorLog = log.extend("error");
    const infoLog = log.extend("info");

    return new Log(source, infoLog, errorLog);
};

export default init;
