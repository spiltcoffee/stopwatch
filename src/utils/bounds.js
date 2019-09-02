module.exports = function(diameter) {
  const { screen } = require("electron");
  const { workArea } = screen.getPrimaryDisplay();
  const x = workArea.width + workArea.x - diameter;
  const y = workArea.height + workArea.y - diameter;
  return { width: diameter, height: diameter, x, y };
};
