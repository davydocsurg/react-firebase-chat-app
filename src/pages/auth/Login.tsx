import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { config } from "../../config";

const Login = (): React.ReactElement => {
    const [err, setErr] = useState(false);
    const [fields, setFields] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            email: e.target.value,
        });
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            password: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res: any = await signInWithEmailAndPassword(
                auth,
                fields.email,
                fields.password
            );
            localStorage.setItem("token", res.user.accessToken!);
            localStorage.setItem("uid", res.user?.uid!);
            setLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">{config.appName}</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleEmail}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handlePassword}
                    />
                    <button type="submit" disabled={loading}>
                        Sign in
                    </button>
                    {err && (
                        <span>
                            Something went wrong.
                            <br />
                            Check your details and try again!
                        </span>
                    )}
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
