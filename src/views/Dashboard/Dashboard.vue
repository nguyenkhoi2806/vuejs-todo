<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import useSettingStore from "@/stores/setting";

import Count from "../Count/Count.vue";
import Todo from "../Todo/Todo.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Todo,
    Count,
  },
  setup() {
    const settingStore = useSettingStore();
    const { themeSelected } = storeToRefs(settingStore);
    return {
      themeSelected,
    };
  },
  data() {
    return {
      currentTab: "Todo",
    };
  },
  computed: {
    isCountActive() {
      if (this.currentTab === "Count") {
        return this.getClassActive();
      }
      return "";
    },
    isTodoActive() {
      if (this.currentTab === "Todo") {
        return this.getClassActive();
      }
      return "";
    },
  },
  methods: {
    switchTo(tab) {
      this.currentTab = tab;
    },
    getClassActive() {
      const { themeSelected } = this;
      return [
        "bg-" + themeSelected.backgroundColor,
        "text-" + themeSelected.textColor,
        "hover:bg" + themeSelected.textColor + "-700",
      ];
    },
  },
});
</script>

<template>
  <ul class="dashboard-tabs" role="tablist">
    <li>
      <a href="#Todo" :class="[isTodoActive]" @click="switchTo('Todo')">
        Todo
      </a>
    </li>
    <li>
      <a href="#Count" :class="[isCountActive]" @click="switchTo('Count')">
        Count
      </a>
    </li>
  </ul>
  <div class="dashboard-pages">
    <KeepAlive>
      <component :is="currentTab"></component>
    </KeepAlive>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-tabs {
  display: flex;
  border-bottom: 1px solid #ccc;

  li {
    margin-top: 2rem;
    margin-bottom: 1rem;
    a {
      padding: 0.5rem 1rem;
      border-radius: 5px;
    }
  }
}

.dashboard-pages {
  padding-top: 2rem;
}
</style>
