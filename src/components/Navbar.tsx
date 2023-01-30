import React from "react";
import { config } from "../config";
import { useAuthContext } from "../contexts";

const Navbar = (): React.ReactElement => {
    const { displayName, photoURL } = useAuthContext();

    return (
        <div className="navbar">
            <span className="logo">{config.appName}</span>
            <div className="user">
                <img src={photoURL} alt="" />
                <span>{displayName?.split(" ")[0]}</span>
                <button onClick={() => console.log("auth")}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
