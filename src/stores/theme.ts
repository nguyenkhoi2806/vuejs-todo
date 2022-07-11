import { defineStore } from "pinia";

type ThemeType = {
  showProgress: boolean;
};

export const useThemeStore = defineStore({
  id: "theme",
  state: () =>
    ({
      showProgress: false,
    } as ThemeType),
  actions: {
    updateShowProgress() {
      this.showProgress = !this.showProgress;
    },
  },
});

export default useThemeStore;
