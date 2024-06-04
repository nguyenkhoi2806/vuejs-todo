import { createMemoryHistory, createRouter } from "vue-router";

import AboutView from "@/views/About/About.vue";
import TodoView from "@/views/Dashboard/Todo/Todo.vue";
import ProductView from "@/views/Product/Product.vue";
import ShoppingView from "@/views/Shopping/Shopping.vue";

import {
  ROUTE_ABOUT_US,
  ROUTE_DASHBOARD,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_SHOPPING_CART,
} from "./constants/route";

const routes = [
  { path: ROUTE_DASHBOARD, component: TodoView },
  { path: ROUTE_ABOUT_US, component: AboutView },
  { path: ROUTE_SHOPPING_CART, component: ShoppingView },
  { path: ROUTE_PRODUCT_DETAIL, component: ProductView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
