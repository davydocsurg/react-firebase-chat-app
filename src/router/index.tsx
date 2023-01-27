import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import ErrorPage from "../pages/errors";
import AuthGuard from "./AuthGuard";

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthGuard>
                <Home />
            </AuthGuard>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/register",
        element: (
            <AuthGuard>
                <Register />
            </AuthGuard>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/login",
        element: (
            <AuthGuard>
                <Login />
            </AuthGuard>
        ),
        errorElement: <ErrorPage />,
    },
]);

export default Router;
