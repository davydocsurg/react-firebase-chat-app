import React, { useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { checkAuthToken } from "../config";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const isAuthenticated = checkAuthToken();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        // navigate("/");
    }, [isAuthenticated, history]);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    return children;
};

export default AuthGuard;
