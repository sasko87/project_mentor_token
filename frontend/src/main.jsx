import React from "react";
import ReactDOM from "react-dom/client";
import { jwtDecode } from "jwt-decode";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import LandingPagesLayout from "./Layouts/LandingPagesLayout.jsx";
import AuthPagesLayouts from "./Layouts/AuthPagesLayouts.jsx";
import Login from "./components/Login/Login.jsx";
import AdminPages from "./Layouts/AdminPages.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Mentors from "./pages/Mentors/Mentors.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import JobFeed from "./pages/JobFeed/JobFeed.jsx";
import MyStats from "./pages/MyStats/MyStats.jsx";
import MentorProfile from "./pages/MentorProfile/MentorProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import Unauthorized from "./components/Unauthorized/Unauthorized.jsx";

const token = window.localStorage.getItem("token");
const user = jwtDecode(token);

const router = createBrowserRouter([
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
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AdminPages />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/mentors",
            element: user.type === "startup" ? <Mentors /> : <Unauthorized />,
          },
          {
            path: "/jobs",
            element: user.type === "startup" ? <Jobs /> : <Unauthorized />,
          },
          {
            path: "/jobFeed",
            element: user.type === "mentor" ? <JobFeed /> : <Unauthorized />,
          },
          {
            path: "/mystats",
            element: user.type === "mentor" ? <MyStats /> : <Unauthorized />,
          },
          {
            path: "/mentors/:id",
            element:
              user.type === "startup" ? <MentorProfile /> : <Unauthorized />,
          },
        ],
      },

      {
        element: <AuthPagesLayouts />,
        children: [
          {
            path: "/reset-password/:id/:token",
            element: <ResetPassword />,
          },

          {
            path: "/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
