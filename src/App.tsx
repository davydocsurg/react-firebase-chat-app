import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";
// import { useEffect } from "react";
// import { firebaseConfig } from "../firebase";

function App() {
    // useEffect(() => {
    //     console.log(firebaseConfig);
    // }, []);

    return (
        <>
            <RouterProvider router={Router} />
        </>
    );
}

export default App;
