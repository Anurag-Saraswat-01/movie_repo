const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage/IndexPage.vue") },
      {
        path: "login",
        component: () => import("pages/LoginPage/LoginPage.vue"),
      },
      {
        path: "signup",
        component: () => import("pages/SignupPage/SignupPage.vue"),
      },
      {
        path: "add-movie",
        component: () => import("pages/AddMovie/AddMovie.vue"),
      },
      {
        path: "my-movies",
        component: () => import("pages/MyMovies/MyMovies.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound/ErrorNotFound.vue"),
  },
];

export default routes;
