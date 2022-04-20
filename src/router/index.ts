import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/blog",
        name: "Blog",
        component: () => import("@/views/Blog.vue"),
    },
    {
        path: "/feedback",
        name: "Feedback",
        component: () => import("@/views/Feedback.vue"),
    },
    {
        path: "/wip",
        name: "WIP",
        component: () => import("@/views/WIP.vue"),
    },
    {
        path: "/post",
        name: "Post",
        component: () => import("@/views/Post.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
