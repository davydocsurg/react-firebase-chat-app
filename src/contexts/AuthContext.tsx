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

export const AuthProvider = ({ children }: JSX.Element | any) => {
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
            console.log("changed");
            setAuthUserData({
                ...authUserData,
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                isAnonymous: user.isAnonymous,
                tenantId: user.tenantId,
                providerData: user.providerData,
                metadata: user.metadata,
                refreshToken: user.refreshToken,
                accessToken: user.accessToken,
            });
            console.log(authUserData);
        });

        return () => {
            sub();
        };
    }, [authToken !== null]);

    return (
        <AuthContext.Provider
            value={{
                displayName: authUserData.displayName,
                accessToken: authUserData.accessToken,
                auth: authUserData.auth,
                email: authUserData.email,
                emailVerified: authUserData.emailVerified,
                isAnonymous: authUserData.isAnonymous,
                metadata: authUserData.metadata,
                phoneNumber: authUserData.phoneNumber,
                photoURL: authUserData.photoURL,
                providerData: authUserData.providerData,
                refreshToken: authUserData.refreshToken,
                tenantId: authUserData.tenantId,
                uid: authUserData.uid,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
