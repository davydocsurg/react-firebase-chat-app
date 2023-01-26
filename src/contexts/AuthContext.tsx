import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
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

const authToken = localStorage.getItem("token");

export const AuthProvider: React.FC = ({
    children,
}: React.EmbedHTMLAttributes<any>) => {
    const [authUserData, setAuthUserData] = useState<AuthContextType>({
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
    });

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user: any) => {
            setAuthUserData({
                ...authUserData,
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
            });
        });

        return () => {
            sub();
        };
    }, [authToken !== null]);

    return (
        <AuthContext.Provider value={{ authUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
