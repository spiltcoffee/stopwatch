const { app } = require("electron");
const jetpack = require("fs-jetpack");
const { PRODUCTION } = require("./flags");

const defaultConfig = {
  max: 900,
  autoKnock: true,
  alwaysOnTop: true,
  openAtLogin: PRODUCTION,
  diameter: 400
};

class Settings {
  constructor(dir) {
    this.jetpack = jetpack.cwd(dir);
    this.config = null;
  }

  load() {
    if (this.config === null) {
      console.log("loaded called");
      if (this.jetpack.exists("settings.json")) {
        this.config = {
          ...defaultConfig,
          ...this.jetpack.read("settings.json", "json")
        };
      } else {
        this.config = {
          ...defaultConfig
        };
      }
    }
    return { ...this.config };
  }

  save(config) {
    if (config) {
      this.config = config;
    }

    const settingsToSave = Object.entries(this.config)
      .filter(([key, value]) => {
        return value !== defaultConfig[key];
      })
      .reduce((obj, [key, value]) => {
        return Object.assign(obj, { [key]: value });
      }, {});

    this.jetpack.file("settings.json", {
      content: settingsToSave
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
