import { app } from "electron";
import jetpack from "fs-jetpack";
import { PRODUCTION } from "./flags";

export interface SettingsInterface {
  max: number;
  alwaysOnTop: boolean;
  openAtLogin: boolean;
  autoKnock: boolean;
  diameter: number;
}

const defaultSettings = {
  max: 900,
  autoKnock: true,
  alwaysOnTop: true,
  openAtLogin: PRODUCTION,
  diameter: 400,
} as SettingsInterface;

class Settings {
  private jetpack: ReturnType<typeof jetpack.cwd>;
  private settings: SettingsInterface;

  constructor(dir: string) {
    this.jetpack = jetpack.cwd(dir);
    this.settings = null;
  }

  load() {
    if (this.settings === null) {
      if (this.jetpack.exists("settings.json")) {
        this.settings = {
          ...defaultSettings,
          ...this.jetpack.read("settings.json", "json"),
        };
      } else {
        this.settings = defaultSettings;
      }
    }
    return { ...this.settings };
  }

  save(config: SettingsInterface) {
    if (config) {
      this.settings = config;
    }

    const settingsToSave = Object.entries(this.settings)
      .filter(
        ([key, value]) =>
          value !== defaultSettings[<keyof SettingsInterface>key],
      )
      .reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        {} as SettingsInterface,
      );

    this.jetpack.file("settings.json", {
      content: settingsToSave,
    });
  }
}

let settings: Settings;
export default function getSettings() {
  if (!settings) {
    settings = new Settings(app.getPath("userData"));
  }
  return settings;
}
