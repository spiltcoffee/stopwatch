import path from "path";

import squirrel from "electron-squirrel-startup";
import { app, BrowserWindow, ipcMain } from "electron";

import settings from "./utils/settings";
import logger from "./utils/logger";
import bounds from "./utils/bounds";

const icon = path.resolve(__dirname, require("./favicon.ico").default);
const APP_ID = "SpiltCoffee.VRStopwatch";

let mainWindow: BrowserWindow;

if (squirrel || !app.requestSingleInstanceLock()) {
  app.quit();
}

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

const createWindow = () => {
  const { diameter, alwaysOnTop, openAtLogin } = settings().load();

  app.setLoginItemSettings({ openAtLogin });

  mainWindow = new BrowserWindow({
    ...bounds(diameter),
    alwaysOnTop,
    icon,
    transparent: true,
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.platform === "win32") {
    mainWindow.setAppDetails({
      appId: APP_ID,
      appIconPath: icon,
      relaunchCommand: app.getPath("exe"),
      relaunchDisplayName: "VR Stopwatch",
    });
  }

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.setAppLogsPath(path.join(app.getPath("userData"), "logs"));
app.setAppUserModelId(APP_ID);

app.on("ready", createWindow);

app.on("second-instance", () => {
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.focus();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("close", () => {
  mainWindow.close();
});

ipcMain.on("load-settings", (event) => {
  event.returnValue = settings().load();
});

ipcMain.on("save-settings", (_, newSettings) => {
  const oldSettings = settings().load();
  settings().save(newSettings);

  if (newSettings.diameter !== oldSettings.diameter) {
    mainWindow.setBounds(bounds(newSettings.diameter));
  }

  if (newSettings.alwaysOnTop !== oldSettings.alwaysOnTop) {
    mainWindow.setAlwaysOnTop(newSettings.alwaysOnTop);
  }

  if (newSettings.openAtLogin !== oldSettings.openAtLogin) {
    app.setLoginItemSettings({ openAtLogin: newSettings.openAtLogin });
  }
});

ipcMain.on("finished", (_, session) => {
  if (mainWindow.isMinimized()) {
    mainWindow.flashFrame(true);
  }
  logger().session(session);
});
