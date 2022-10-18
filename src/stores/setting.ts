import { defineStore } from "pinia";

import type { Theme } from "@/models/Theme";

import { THEME_DEFAULT } from "../constants/theme";

type ThemeType = {
  showProgress: boolean;
  themeSelected: Theme;
};

export const useSettingStore = defineStore({
  id: "theme",
  state: () =>
    ({
      showProgress: false,
      themeSelected: THEME_DEFAULT,
    } as ThemeType),
  actions: {
    updateShowProgress() {
      this.showProgress = !this.showProgress;
    },
    updateThemeSelected(theme: Theme) {
      this.themeSelected = theme;
    },
  },
});

export default useSettingStore;
