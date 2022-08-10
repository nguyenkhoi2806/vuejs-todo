import type { Theme } from "@/models/theme";

export const THEME_DEFAULT = <Theme>{
  backgroundColor: "blue-500",
  textColor: "white",
  name: "Blue",
};

export const THEME_DATA = [
  THEME_DEFAULT,
  {
    backgroundColor: "red-500",
    textColor: "white",
    name: "Red",
  },
  {
    backgroundColor: "gray-500",
    textColor: "black",
    name: "Gray",
  },
] as Theme[];
