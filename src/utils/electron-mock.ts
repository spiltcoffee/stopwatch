export const ipcRenderer = {
  send() {
    // do nothing
  },
  sendSync(eventType: string) {
    if (eventType === "load-settings") {
      return {
        max: 900,
      };
    }
    return {};
  },
};
