import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
// import { AuthContext } from "./AuthContext";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const restrictedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? publicRoutes : []),
    ...restrictedRoutes,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
