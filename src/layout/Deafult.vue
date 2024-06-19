<script>
import HeaderApp from "./Header.vue";
import FooterApp from "./Footer.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "Layout",
  components: { Loading, HeaderApp, FooterApp },
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    handleSlideBar() {
      this.open = !this.open;
    },
  },
};
</script>

<template>
  <div>
    <SlideBar :on-close="handleSlideBar" :open="open" />
    <HeaderApp :open-slide="handleSlideBar" />
    <section class="bg-white py-8">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <suspense timeout="0">
              <template #default>
                <component :is="component" :key="$route.path"></component>
              </template>
              <template #fallback>
                <div class="flex items-center justify-center">
                  <Loading />
                </div>
              </template>
            </suspense>
          </div>
        </nav>
      </div>
    </section>
    <FooterApp />
  </div>
</template>
