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
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Mentors from "./pages/Mentors/Mentors.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import JobFeed from "./pages/JobFeed/JobFeed.jsx";
import MyStats from "./pages/MyStats/MyStats.jsx";
import MentorProfile from "./pages/MentorProfile/MentorProfile.jsx";

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
            element: <Mentors />,
          },
          {
            path: "/jobs",
            element: <Jobs />,
          },
          {
            path: "/jobFeed",
            element: <JobFeed />,
          },
          {
            path: "/mystats",
            element: <MyStats />,
          },
          {
            path: "/mentors/:id",
            element: <MentorProfile />,
          },
        ],
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
