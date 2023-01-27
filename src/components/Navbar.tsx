import React from "react";
import { config } from "../config";
import { useAuthContext } from "../contexts";

const Navbar = (): React.ReactElement => {
    const { displayName, photoURL } = useAuthContext();
    console.log(photoURL);

    return (
        <div className="navbar">
            <span className="logo">{config.appName}</span>
            <div className="user">
                <span>{displayName?.split(" ")[0]}</span>
                <img src={photoURL} alt="" />
                <button onClick={() => console.log("auth")}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
