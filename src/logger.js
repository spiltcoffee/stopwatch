const { app } = require("electron");
const jetpack = require("fs-jetpack");
const moment = require("moment");

class Logger {
  constructor(dir) {
    this.jetpack = jetpack.cwd(dir);
  }

  session(session) {
    session = {
      ...session,
      timestamp: moment().toISOString()
    };
    this.jetpack.append("sessions.json.log", `${JSON.stringify(session)}\n`);
  }
}

let logger;
module.exports = () => {
  if (!logger) {
    logger = new Logger(app.getPath("logs"));
  }
  return logger;
};
