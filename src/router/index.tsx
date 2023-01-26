import { Component } from "react";
import { Routes, createBrowserRouter, Route, Navigate } from "react-router-dom";
import { checkAuthToken } from "../config";
import { Home, Login, Register } from "../pages";
import ErrorPage from "../pages/errors";
import AuthGuard from "./AuthGuard";

// set auth guards
const isAuthenticated = checkAuthToken();

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
