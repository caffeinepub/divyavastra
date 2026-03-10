import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type React from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import ProductFormPage from "./pages/ProductFormPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const productNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/product/new",
  component: () => <ProductFormPage />,
});

const productEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/product/$id",
  component: () => <ProductFormPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  adminLoginRoute,
  adminDashboardRoute,
  productNewRoute,
  productEditRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
