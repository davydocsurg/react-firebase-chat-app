import React from "react";
import { useRouteError } from "react-router-dom";

// locals
import "../../assets/scss/error.scss";

const ErrorPage = (): React.ReactElement => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page-container">
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
