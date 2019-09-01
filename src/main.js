const path = require("path");

const squirrel = require("electron-squirrel-startup");
const { app, BrowserWindow, ipcMain } = require("electron");

const settings = require("./settings");
const logger = require("./logger");
const utils = require("./utils");

const icon = path.resolve(__dirname, require("./favicon.ico"));
const APP_ID = "SpiltCoffee.PAXVRTimer";

let mainWindow;

if (squirrel || !app.requestSingleInstanceLock()) {
  app.quit();
}

const createWindow = () => {
  const { radius, alwaysOnTop, openAtLogin } = settings().load();

  app.setLoginItemSettings({ openAtLogin });

  mainWindow = new BrowserWindow({
    ...utils.desiredBounds(radius * 2),
    alwaysOnTop,
    icon,
    transparent: true,
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setAppDetails({
    appId: APP_ID,
    appIconPath: icon,
    relaunchCommand: app.getPath("exe"),
    relaunchDisplayName: "PAX VR Timer"
  });

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

ipcMain.on("load-settings", event => {
  event.returnValue = settings().load();
});

ipcMain.on("save-settings", (_, settings) => {
  const oldSettings = settings().load();
  settings().save(settings);

  if (settings.radius !== oldSettings.radius) {
    mainWindow.setBounds(utils.desiredBounds(radius * 2));
  }

  if (settings.alwaysOnTop !== oldSettings.alwaysOnTop) {
    mainWindow.setAlwaysOnTop(settings.alwaysOnTop);
  }

  if (settings.openAtLogin !== oldSettings.openAtLogin) {
    app.setLoginItemSettings({ openAtLogin: settings.openAtLogin });
  }
});

ipcMain.on("finished", (_, session) => {
  if (mainWindow.isMinimized()) {
    mainWindow.flashFrame(true);
  }
  logger().session(session);
});
