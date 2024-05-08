import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./utils/Auth/AuthContext.jsx";
import ProtectedRoute from "./utils/Auth/ProtectedRoute.jsx";
import {
  Dashboard,
  Explore,
  Listing,
  Login,
  Orders,
  Product,
  Profile,
  Registration,
  Users,
} from "./pages/index.js";
import { NavbarLayout, Footer } from "../src/Layouts/index.js";

const Routes = () => {
  const Root = () => {
    return (
      <div className="flex flex-col items-center justify-start w-screen max-w-screen-xl scroll-smooth">
        <NavbarLayout />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const { token } = useAuth();

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
          path: "/explore/:name",
          element: <Explore />,
        },
        {
          path: "/users",
          element: <Users />,
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

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile/",
          element: <Root />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
          ],
        },
        {
          path: "/profile/listings",
          element: <Root />,
          children: [
            {
              index: true,
              element: <Listing />,
            },
          ],
        },
        {
          path: "/profile/orders",
          element: <Root />,
          children: [
            {
              index: true,
              element: <Orders />,
            },
          ],
        },
      ],
    },
  ];

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

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
