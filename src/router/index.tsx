import { Component } from "react";
import { Routes, createBrowserRouter, Route, Navigate } from "react-router-dom";
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

// const Router = () => {
//     return (
//         <Routes>
//             {/* <PrivateRoute path="/" element={<Home />} /> */}
//             <Route
//                 path="/"
//                 element={
//                     isAuthenticated === true ? (
//                         <Navigate to="/" /> //|| <Component />
//                     ) : (
//                         <Navigate to="login" />
//                     )
//                 }
//             ></Route>
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//         </Routes>
//     );
// };

export default Router;
