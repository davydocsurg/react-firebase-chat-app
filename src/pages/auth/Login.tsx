import React, { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";

const Login = (): React.ReactElement => {
    const [err, setErr] = useState(false);

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">{config.appName}</span>
                <span className="title">Login</span>
                <form onSubmit={() => console.log("")}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
