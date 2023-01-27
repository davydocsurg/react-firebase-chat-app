import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { checkAuthToken } from "../config";
import { Home, Login, Register } from "../pages";
import ErrorPage from "../pages/errors";
import AuthGuard from "./AuthGuard";

const token = checkAuthToken();

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

// const Router = () => {
//     <Routes>
//         <Route path="/">
//             <Route
//                 index
//                 element={
//                     <AuthGuard>
//                         <Home />
//                     </AuthGuard>
//                 }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//         </Route>
//     </Routes>;
// };

export default Router;
