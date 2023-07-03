import { app } from "electron";
import jetpack from "fs-jetpack";
import { v4 as uuid } from "uuid";

class Instance {
  private jetpack: ReturnType<typeof jetpack.cwd>;
  private instance: string;

  constructor(dir: string) {
    this.jetpack = jetpack.cwd(dir);
    this.instance = null;
  }

  get() {
    if (!this.jetpack.exists("instance")) {
      this.jetpack.file("instance", { content: uuid() });
    }

    if (!this.instance) {
      this.instance = this.jetpack.read("instance", "utf8");
    }
    return this.instance;
  }
}

let instance: Instance;
export default function getInstance() {
  if (!instance) {
    instance = new Instance(app.getPath("userData"));
  }
  return instance;
}
