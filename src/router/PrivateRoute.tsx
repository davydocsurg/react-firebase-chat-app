import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { checkAuthToken } from "../config";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const navigate = useNavigate();
    const isAuthenticated = checkAuthToken();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, history]);

    return (
        <Route
            {...rest}
            render={(props: React.PropsWithoutRef<any>) =>
                isAuthenticated ? <Component {...props} /> : null
            }
        />
    );
};

export default PrivateRoute;
