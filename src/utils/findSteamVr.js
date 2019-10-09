const ps = require("ps-node");

module.exports = new Promise(resolve => {
  ps.lookup({ command: "vrmonitor" }, (err, results) => {
    if (!err && results.length) {
      resolve(true);
    }
    resolve(false);
  });
});
