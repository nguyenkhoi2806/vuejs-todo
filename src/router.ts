import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import AboutView from "@/views/About/About.vue";
import DashboardView from "@/views/Dashboard/Dashboard.vue";
import ProductView from "@/views/Product/Product.vue";
import ShoppingView from "@/views/Shopping/Shopping.vue";

import {
  ROUTE_ABOUT_US,
  ROUTE_DASHBOARD,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_SHOPPING_CART,
} from "./constants/route";

const routes = [
  {
    path: ROUTE_DASHBOARD,
    name: "Home",
    component: DashboardView,
  },
  {
    path: ROUTE_ABOUT_US,
    name: "About",
    component: AboutView,
  },
  {
    path: ROUTE_SHOPPING_CART,
    name: "Shopping-cart",
    component: ShoppingView,
  },
  {
    path: ROUTE_PRODUCT_DETAIL,
    name: "Product",
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
