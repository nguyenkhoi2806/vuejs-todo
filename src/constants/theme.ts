import type { Theme } from "@/models/theme";

export const THEME_DEFAULT = <Theme>{
  backgroundColor: "red-500",
  textColor: "white",
  name: "Red",
};

export const THEME_DATA = [
  THEME_DEFAULT,
  {
    backgroundColor: "blue-500",
    textColor: "white",
    name: "Blue",
  },
  {
    backgroundColor: "gray-500",
    textColor: "white",
    name: "Gray",
  },
] as Theme[];
