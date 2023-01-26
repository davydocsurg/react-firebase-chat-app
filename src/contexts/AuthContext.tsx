import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const AuthContext = createContext({
    authUser: {},
});

export const AuthProvider: React.FC = ({
    children,
}: React.EmbedHTMLAttributes<any>) => {
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user) => {
            console.log(user);

            setAuthUser(user);
        });

        return () => {
            sub();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ authUser }}>
            {children}
        </AuthContext.Provider>
    );
};
