import { app } from "electron";
import jetpack from "fs-jetpack";
import moment from "moment";
import instance from "./instance";

class Logger {
  private jetpack: ReturnType<typeof jetpack.cwd>;

  constructor(dir: string) {
    this.jetpack = jetpack.cwd(dir);
  }

  session(session: Record<string, unknown>) {
    session = {
      ...session,
      instance: instance().get(),
      timestamp: moment().toISOString(),
    };
    this.jetpack.append("sessions.json.log", `${JSON.stringify(session)}\n`);
  }
}

let logger: Logger;
export default function getLogger() {
  if (!logger) {
    logger = new Logger(app.getPath("logs"));
  }
  return logger;
}
