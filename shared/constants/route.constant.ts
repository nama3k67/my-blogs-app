export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    BLOG_LIST: "/blogs",
    BLOG_DETAILS: "/blogs/:slug",
    ABOUT: "/about",
    PROJECTS: "/projects",
  },
  PROTECTED: {
    DASHBOARD: "/dashboard",
    BLOG_CREATE: "/blogs/create",
    BLOG_EDIT: "/blogs/edit/:slug",
    BLOG_PREVIEW: "/blogs/preview",
  },
};
