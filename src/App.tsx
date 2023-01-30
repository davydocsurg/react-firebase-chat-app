import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";
import { AuthProvider, ChatProvider } from "./contexts";
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
                <ChatProvider>
                    {/* <Router /> */}
                    <RouterProvider router={Router} />
                </ChatProvider>
            </AuthProvider>
        </>
    );
}

export default App;
