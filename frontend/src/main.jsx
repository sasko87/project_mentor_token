import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import LandingPagesLayout from "./Layouts/LandingPagesLayout.jsx";
import AuthPagesLayouts from "./Layouts/AuthPagesLayouts.jsx";
import Login from "./components/Login/Login.jsx";
import AdminPages from "./Layouts/AdminPages.jsx";
import DashboardStartup from "./pages/DashboardStartup/DashboardStartup.jsx";
import Register from "./pages/Register/Register.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <LandingPagesLayout>
  //       <Home />
  //     </LandingPagesLayout>
  //   ),
  // },
  // {
  //   path: "/about",
  //   element: (
  //     <LandingPagesLayout>
  //       <About />
  //     </LandingPagesLayout>
  //   ),
  // },
  // {
  //   path: "/contact",
  //   element: (
  //     <LandingPagesLayout>
  //       <Contact />
  //     </LandingPagesLayout>
  //   ),
  // },
  // {
  //   path: "/login",
  //   element: (
  //     <AuthPagesLayouts>
  //       <Login />
  //     </AuthPagesLayouts>
  //   ),
  // },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
  {
    element: <LandingPagesLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  {
    element: <AuthPagesLayouts />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <AdminPages />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardStartup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
