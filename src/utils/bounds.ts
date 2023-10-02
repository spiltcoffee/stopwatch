import { screen } from "electron";

export default function getBounds(diameter: number) {
  const { workArea } = screen.getPrimaryDisplay();
  const x = workArea.width + workArea.x - diameter;
  const y = workArea.height + workArea.y - diameter;
  return { width: diameter, height: diameter, x, y };
}
