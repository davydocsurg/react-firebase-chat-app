import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/scss/index.scss";

function App() {
    return (
        <>
            <RouterProvider router={Router} />
        </>
    );
}

export default App;
