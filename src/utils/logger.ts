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

  update(
    type: "log" | "info" | "warn" | "error",
    message: unknown,
    ...args: unknown[]
  ) {
    const update = {
      type,
      message,
      args,
      timestamp: moment().toISOString(),
    };
    this.jetpack.append("update.json.log", `${JSON.stringify(update)}\n`);
  }
}

let logger: Logger;
export default function getLogger(): Logger {
  if (!logger) {
    logger = new Logger(app.getPath("logs"));
  }
  return logger;
}
