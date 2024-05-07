import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
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
import Footer from "./Layouts/Footer.jsx";
import Explore from "./pages/Explore.jsx";
import Users from "./pages/Users.jsx";

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
