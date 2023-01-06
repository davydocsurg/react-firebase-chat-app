import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

const Register = (): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    return (
        <>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">Chatt3r</span>
                    <span className="title">Register</span>
                    <form onSubmit={() => console.log("submit")}>
                        <input required type="text" placeholder="First Name" />
                        <input required type="text" placeholder="Last Name" />
                        <input required type="email" placeholder="Email" />
                        <input
                            required
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            required
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                        />
                        <label htmlFor="file">
                            <>{<AiOutlineUserAdd />}</>
                            <span>Add an avatar</span>
                        </label>
                        <button disabled={loading}>Sign up</button>
                        {loading &&
                            "Uploading and compressing the image please wait..."}
                        {err && <span>Something went wrong</span>}
                    </form>
                    <p>
                        Don't have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
