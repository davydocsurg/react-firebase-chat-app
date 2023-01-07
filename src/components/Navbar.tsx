import React from "react";
import { config } from "../config";

const Navbar = (): React.ReactElement => {
    return (
        <div className="navbar">
            <span className="logo">{config.appName}</span>
            <div className="user">
                <img src={"currentUser.photoURL"} alt="" />
                <span>{"currentUser.displayName"}</span>
                <button onClick={() => console.log("auth")}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
