import React from "react";
import { Chat, Sidebar } from "../components";

const Home = (): React.ReactElement => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
};

export default Home;
