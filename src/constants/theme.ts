import type { Theme } from "@/models/Theme";

export const THEME_DEFAULT = <Theme>{
  backgroundColor: "red-500",
  textColor: "white",
  name: "Red",
  colorRGB: "rgb(239 68 68)",
};

export const THEME_DATA = [
  THEME_DEFAULT,
  {
    backgroundColor: "blue-500",
    textColor: "white",
    name: "Blue",
    colorRGB: "rgb(59 130 246)",
  },
  {
    backgroundColor: "gray-500",
    textColor: "white",
    name: "Gray",
    colorRGB: "rgb(107 114 128)",
  },
] as Theme[];
