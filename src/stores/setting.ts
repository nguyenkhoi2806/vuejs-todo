import { defineStore } from "pinia";

import { THEME_DEFAULT } from "@/constants/theme";
import type { Theme } from "@/models/theme";

type ThemeType = {
  showProgress: boolean;
  theme: Theme;
};

export const useSettingStore = defineStore({
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

export default useSettingStore;
