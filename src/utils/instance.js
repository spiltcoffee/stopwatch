const { app } = require("electron");
const jetpack = require("fs-jetpack");
const uuid = require("uuid/v4");

class Instance {
  constructor(dir) {
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

let instance;
module.exports = () => {
  if (!instance) {
    instance = new Instance(app.getPath("userData"));
  }
  return instance;
};
