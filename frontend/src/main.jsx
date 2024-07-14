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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LandingPagesLayout>
        <Home />
      </LandingPagesLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <LandingPagesLayout>
        <About />
      </LandingPagesLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <LandingPagesLayout>
        <Contact />
      </LandingPagesLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthPagesLayouts>
        <Login />
      </AuthPagesLayouts>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
