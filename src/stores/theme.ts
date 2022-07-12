import { defineStore } from "pinia";

import { THEME_DEFAULT } from "@/constants/theme";
import type { ITheme } from "@/models/theme";

type ThemeType = {
  showProgress: boolean;
  theme: ITheme;
};

export const useThemeStore = defineStore({
  id: "theme",
  state: () =>
    ({
      showProgress: false,
      theme: THEME_DEFAULT,
    } as ThemeType),
  actions: {
    updateShowProgress() {
      this.showProgress = !this.showProgress;
    },
  },
});

export default useThemeStore;
