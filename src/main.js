const path = require("path");

const squirrel = require("electron-squirrel-startup");
const { app, BrowserWindow, ipcMain } = require("electron");

const settings = require("./utils/settings");
const logger = require("./utils/logger");
const bounds = require("./utils/bounds");

const icon = path.resolve(__dirname, require("./favicon.ico"));
const APP_ID = "SpiltCoffee.VRStopwatch";

const WM_KEYDOWN = 0x0100; // https://docs.microsoft.com/en-au/windows/win32/inputdev/wm-keydown
const WM_KEYUP = 0x0101; // https://docs.microsoft.com/en-au/windows/win32/inputdev/wm-keyup
const VK_F1 = 0x70; // https://docs.microsoft.com/en-au/windows/win32/inputdev/virtual-key-codes

const win32 = () => {
  if (process.platform !== "win32") {
    return null;
  }

  const ffi = require("ffi");

  return new ffi.Library("user32", {
    FindWindowA: ["long", ["string", "string"]], // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowa
    PostMessageA: ["int32", ["long", "int32", "long", "int32"]] // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagea
  });
};

let mainWindow;

if (squirrel || !app.requestSingleInstanceLock()) {
  app.quit();
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
      nodeIntegration: true
    }
  });

  if (process.platform === "win32") {
    mainWindow.setAppDetails({
      appId: APP_ID,
      appIconPath: icon,
      relaunchCommand: app.getPath("exe"),
      relaunchDisplayName: "VR Stopwatch"
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

ipcMain.on("load-settings", event => {
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

ipcMain.on("knock", () => {
  if (win32) {
    const handle = win32.FindWindowA(null, "Want my attention?");
    if (handle) {
      win32.PostMessageA(handle, WM_KEYDOWN, VK_F1, 0);
      win32.PostMessageA(handle, WM_KEYUP, VK_F1, 0);
    }
  }
});
