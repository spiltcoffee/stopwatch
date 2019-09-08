module.exports = {
  ipcRenderer: {
    send() {},
    sendSync(eventType) {
      if (eventType === "load-settings") {
        return {
          max: 900
        };
      }
      return {};
    }
  }
};
