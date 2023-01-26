import React, { useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { checkAuthToken } from "../config";

// const PrivateRoute = ({ component: Component, ...rest }: any) => {
// const navigate = useNavigate();
// const isAuthenticated = checkAuthToken();

// useEffect(() => {
//     if (isAuthenticated) {
//         navigate("/login");
//     }
// }, [isAuthenticated, history]);

//     return (
//         <Route
//             {...rest}
//             render={(props: React.PropsWithoutRef<any>) =>
//                 isAuthenticated ? <Component {...props} /> : null
//             }
//         />
//     );
// };

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const isAuthenticated = checkAuthToken();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, history]);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;
