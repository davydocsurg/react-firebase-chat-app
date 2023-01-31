import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { config } from "../config";
import { useAuthContext } from "../contexts";

const Navbar = (): React.ReactElement => {
    const { displayName, photoURL } = useAuthContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="navbar">
            <span className="logo">{config.appName}</span>
            <div className="user">
                <img src={photoURL} alt="" />
                <span>{displayName?.split(" ")[0]}</span>
                <button onClick={handleSignOut}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
