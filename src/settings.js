const { app } = require("electron");
const jetpack = require("fs-jetpack");

const defaultConfig = {
  max: 900,
  autoKnock: true,
  alwaysOnTop: true,
  openAtLogin: true,
  radius: 200
};

class Settings {
  constructor(dir) {
    this.jetpack = jetpack.cwd(dir);
    this.config = null;
  }

  load() {
    if (this.config === null) {
      if (this.jetpack.exists("settings.json")) {
        this.config = {
          ...defaultConfig,
          ...this.jetpack.read("settings.json", "json")
        };
      } else {
        this.config = defaultConfig;
      }
    }
    return { ...this.config };
  }

  save(config) {
    if (config) {
      this.config = config;
    }

    this.jetpack.file("settings.json", {
      content: this.config
    });
  }
}

let settings;
module.exports = () => {
  if (!settings) {
    settings = new Settings(app.getPath("userData"));
  }
  return settings;
};
