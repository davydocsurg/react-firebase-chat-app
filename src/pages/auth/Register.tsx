import React, { EventHandler, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { config } from "../../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

type fieldType = {
    displayName: string;
    email: string;
    password: string;
    profilePics: File;
};

const Register = (): React.ReactElement => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const [fields, setFields] = useState<fieldType>({
        displayName: "",
        email: "",
        password: "",
        profilePics: null,
    });

    const handleDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            displayName: e.target.value,
        });
    };

    const handleDisplayEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            email: e.target.value,
        });
    };

    const handleDisplayPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            password: e.target.value,
        });
    };

    const handleDisplayFile = (e: React.ChangeEvent<FileList | any>) => {
        setFields({
            ...fields,
            profilePics: e.target.files[0],
        });
    };

    const handleRegister = async (e: SyntheticEvent | any) => {
        setLoading(true);
        e.preventDefault();

        try {
            // if (fields.file == "") {
            //     return setAvatarError("Please select an avatar");
            // }

            const { displayName, email, password, profilePics } = fields;

            // const res =
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: displayName,
                    // photoURL: file,
                });
                // const storage = firebase.storage();
                // const storageRef = storage.ref();
                // const profilePictureBlob = new Blob([profilePics], {
                //     type: profilePics.type,
                // });

                // const profilePictureRef = storageRef.child(
                //     `images/${user?.uid}/profilePicture.jpg`
                // );
                // await profilePictureRef.put(profilePictureBlob);
                // const downloadURL = await profilePictureRef.getDownloadURL();
                // await updateProfile(user, {
                //     photoURL: downloadURL,
                // });

                // await setDoc(doc(db, "users", user.uid), {
                //     uid: user.uid,
                //     displayName,
                //     email,
                //     photoURL: downloadURL,
                // });
                // await firebase
                //     .firestore()
                //     .collection("users")
                //     .doc(user.uid)
                //     .set({
                //         displayName: displayName,
                //         photoURL: profilePics,
                //     });
                navigate("/login");
                return user;
            } else {
                throw new Error("User cannot be created");
            }
            // navigate("/login");
            //Create a unique image name
            // const date = new Date().getTime();
            // const storageRef = ref(storage, `${displayName + date}`);

            // const upload = await uploadBytesResumable(storageRef, file);
            // return console.log(upload, "kmms");
            // if (upload) {
            //     getDownloadURL(storageRef).then(async (downloadURL) => {
            //         try {
            //             //Update profile
            //             await updateProfile(res.user, {
            //                 displayName,
            //                 photoURL: downloadURL,
            //             });
            //             //create user on firestore
            // await setDoc(doc(db, "users", res.user.uid), {
            //     uid: res.user.uid,
            //     displayName,
            //     email,
            //     photoURL: downloadURL,
            // });

            //             //create empty user chats on firestore
            //             await setDoc(doc(db, "userChats", res.user.uid), {});
            //             navigate("/");
            //         } catch (err) {
            //             console.error(err);
            //             setErr(true);
            //             setLoading(false);
            //         }
            //     });
            // }
        } catch (error: unknown) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">{config.appName}</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleRegister}>
                        {/* <input required type="text" placeholder="First Name" /> */}
                        <input
                            required
                            type="text"
                            name="displayName"
                            placeholder="Display Name"
                            onChange={handleDisplayName}
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleDisplayEmail}
                        />
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleDisplayPassword}
                        />
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleDisplayFile}
                        />
                        <label htmlFor="file">
                            <>{<AiOutlineUserAdd />}</>
                            <span>Add an avatar</span>
                        </label>
                        {avatarError && (
                            <small className="errorMessage">
                                {avatarError}
                            </small>
                        )}
                        <button type="submit" disabled={loading}>
                            Sign up
                        </button>
                        <small>
                            {loading &&
                                "Uploading and compressing the image please wait..."}
                        </small>
                        {err && <span>Something went wrong</span>}
                    </form>
                    <p>
                        Don't have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
