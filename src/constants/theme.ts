import type { ITheme } from "@/models/theme";

export const THEME_DEFAULT = <ITheme>{
  backgroundColor: "blue",
  textColor: "white",
};

export const THEME_DATA = [
  THEME_DEFAULT,
  {
    backgroundColor: "red",
    textColor: "white",
  },
  {
    backgroundColor: "gray",
    textColor: "black",
  },
];
