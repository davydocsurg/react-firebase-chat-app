import { createBrowserRouter } from "react-router-dom";
import { Register } from "../pages/auth";
import ErrorPage from "../pages/errors";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Register />,
        errorElement: <ErrorPage />,
    },
]);

export default Router;
