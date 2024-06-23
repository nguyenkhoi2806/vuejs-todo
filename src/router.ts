import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/Home/Home.vue";
import AboutView from "./views/About.vue";
import ProductView from "./views/Product.vue";
import LoginView from "./views/Login.vue";

import {
  ROUTE_ABOUT_US,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_HOME,
  ROUTE_LOGIN,
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
  {
    path: ROUTE_LOGIN,
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
