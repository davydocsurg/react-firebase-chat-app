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
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        // action: () => {
        //     isAuthenticated ? <Home /> : <Login />;
        // },
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
