import { createHashRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import AlbumDetail from "./pages/AlbumDetail";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";

import ProtectedRoute from "./pages/admin/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/Login";
import AdminPlaceholder from "./pages/admin/Placeholder";
import AdminAlbums from "./pages/admin/Albums";
import AdminBookings from "./pages/admin/Bookings";
import AdminServices from "./pages/admin/Services";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "services/:slug", Component: ServiceDetail },
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:slug", Component: AlbumDetail },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "albums", Component: AdminAlbums },
          { path: "bookings", Component: AdminBookings },
          { path: "services", Component: AdminServices },
        ]
      }
    ]
  }
]);
