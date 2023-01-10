export const navLinks = [
  {
    name: "dashboard",
    link: "/",
  },
  {
    name: "create-campaign",
    link: "/create-campaign",
  },
  {
    name: "payment",
    link: "/payment",
    disabled: true,
  },
  {
    name: "withdraw",
    link: "/withdraw",
    disabled: true,
  },
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "logout",
    link: "/logout",
  },
];

export const execluded = ["/register", "/login", "/landing-page"];

export const authRoutes = ["/login", "/register"];
export const protectedRoutes = [
  "/create-campaign",
  "/profile",
  "/my-campaigns",
  "/my-contributions",
  "/consultant",
];
