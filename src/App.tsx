import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";
import { AuthProvider } from "./contexts";
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
            </AuthProvider>
        </>
    );
}

export default App;
