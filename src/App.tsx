import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";
import { AuthProvider } from "./contexts";
import AuthGuard from "./router/AuthGuard";
import { Home } from "./pages";
import { checkAuthToken } from "./config";
import { useEffect } from "react";
// import { useEffect } from "react";
// import { firebaseConfig } from "../firebase";

function App() {
    return (
        <>
            <AuthProvider>
                {/* <Router /> */}
                <RouterProvider router={Router} />
            </AuthProvider>
        </>
    );
}

export default App;
