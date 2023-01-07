import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import ErrorPage from "../pages/errors";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },

    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },

    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
]);

export default Router;
