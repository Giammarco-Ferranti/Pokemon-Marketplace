import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login";
import Registration from "./Registration.jsx";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
