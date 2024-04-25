import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "./utils/Auth/AuthContext.jsx";
import ProtectedRoute from "./utils/Auth/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import NavbarLayout from "./Layouts/Navbar.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import Orders from "./pages/Orders.jsx";
import Listing from "./pages/Listing.jsx";

const Routes = () => {
  const Root = () => {
    return (
      <div className="flex flex-col items-center justify-start w-screen max-w-screen-xl p-3">
        <NavbarLayout />
        <Outlet />
      </div>
    );
  };
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/product/:productId",
          element: <Product />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/listings",
          element: <Listing />,
        },
      ],
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
          element: <Root />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
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
