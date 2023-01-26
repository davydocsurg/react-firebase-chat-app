import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";
import { AuthProvider } from "./contexts";
import PrivateRoute from "./router/PrivateRoute";
import { Home } from "./pages";
// import { useEffect } from "react";
// import { firebaseConfig } from "../firebase";

function App() {
    // useEffect(() => {
    //     console.log(firebaseConfig);
    // }, []);

    return (
        <>
            <AuthProvider>
                <RouterProvider router={Router} />
                {/* <PrivateRoute path="/dashboard" component={Home} /> */}
            </AuthProvider>
        </>
    );
}

export default App;
