import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

type AuthContextType = {
    accessToken: string;
    auth: Object;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: Object;
    phoneNumber: string;
    photoURL: string;
    providerData: Array<Object>;
    refreshToken: string;
    tenantId: string;
    uid: string;
};

export const AuthContext = createContext<AuthContextType>({
    // authUser: {
    accessToken: "",
    auth: {},
    displayName: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    metadata: {},
    phoneNumber: "",
    photoURL: "",
    providerData: [{}],
    refreshToken: "",
    tenantId: "",
    uid: "",
    // },
});

export const AuthProvider: React.FC = ({
    children,
}: React.EmbedHTMLAttributes<any>) => {
    const [authUser, setAuthUser] = useState<AuthContextType>();

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user: any) => {
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
