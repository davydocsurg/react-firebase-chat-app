import React from "react";
import { config } from "../config";
import { useAuthContext } from "../contexts";

const Navbar = (): React.ReactElement => {
    const res = useAuthContext();
    console.log(res.authUser.displayName);

    return (
        <div className="navbar">
            <span className="logo">{config.appName}</span>
            <div className="user">
                <img src={config.defaultPhoto} alt="" />
                {/* <span>{displayName}</span> */}
                <button onClick={() => console.log("auth")}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
