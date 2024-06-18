import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/Home/Home.vue";
import AboutView from "@/views/About/About.vue";
import ProductView from "@/views/Product/Product.vue";

import {
  ROUTE_ABOUT_US,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_HOME,
} from "./constants/route";

const routes = [
  {
    path: ROUTE_ABOUT_US,
    name: "about",
    component: AboutView,
  },
  {
    path: ROUTE_HOME,
    name: "home",
    component: HomeView,
  },
  {
    path: ROUTE_PRODUCT_DETAIL,
    name: "product",
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
