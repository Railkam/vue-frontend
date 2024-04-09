import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "Users",
        component: () => import("./components/Users"),
    },
    {
        path: "/customer/:id",
        name: "User",
        component: () => import("./components/User"),
    },
    {
        path: "/customer/orders",
        name: "Orders",
        component: () => import("./components/Orders"),
    },
    {
        path: "/customer/:id1/orders/:id2",
        name: "Order",
        component: () => import("./components/Order"),
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;