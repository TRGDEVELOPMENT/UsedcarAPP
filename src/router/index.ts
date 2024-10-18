import {createRouter,createWebHashHistory,type RouteRecordRaw,} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { authPermissionStore } from "@/stores/authPermission";

interface RouteMeta {
  roles?: string[];
}
interface State {
  roles: string[];
}
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard", breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/",
        name: "setting",
        meta: {
          pageTitle: "setting", breadcrumbs: ["setting"],
        },
        children:[
          {
            path: "/customersetting",
            name: "customer setting",
            component: () => import("@/views/pages/setting/customersetting/customersetting.vue"),
            meta: {
              pageTitle: "customer setting", breadcrumbs: ["customer setting"],
            },
          },
          {
            path: "/assesssetting",
            name: "assess setting",
            component: () => import("@/views/pages/setting/assesssetting/assesssetting.vue"),
            meta: {
              pageTitle: "assess setting", breadcrumbs: ["assess setting"],
            },
          },
          {
            path: "/remark",
            name: "remark",
            component: () => import("@/views/pages/setting/remark/remark.vue"),
            meta: {
              pageTitle: "remark", breadcrumbs: ["remark"],
            },
          },
          {
            path: "/role",
            name: "user role",
            component: () => import("@/views/pages/setting/user/role.vue"),
            meta: {
              pageTitle: "user role", breadcrumbs: ["user role"],
            },
          },
          {
            path: "/usermanagement",
            name: "usermanagement",
            component: () => import("@/views/pages/setting/user/usermanagement.vue"),
            meta: {
              pageTitle: "user management", breadcrumbs: ["user management"],
            },
          },
        ]
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/pages/account/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/pages/auth/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/pages/auth/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
      {
        path: "/NotPermission",
        name: "NO AUTH",
        component: () => import("@/views/pages/auth/ErrorPermission.vue"),
        meta: {
          pageTitle: "Not Permission",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
  configStore.resetLayoutConfig();
  authStore.verifyAuth();
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
        next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
