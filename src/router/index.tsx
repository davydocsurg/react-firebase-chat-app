import { createBrowserRouter } from "react-router-dom";
import { checkAuthToken } from "../config";
import { Home, Login, Register } from "../pages";
import ErrorPage from "../pages/errors";
import PrivateRoute from "./PrivateRoute";

// set auth guards
const isAuthenticated = checkAuthToken();

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        action: () => {
            isAuthenticated ? <Home /> : <Login />;
        },
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
