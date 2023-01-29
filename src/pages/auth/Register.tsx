import React, { EventHandler, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiOutlineUserAdd } from "react-icons/ai";
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
            if (fields.profilePics == null) {
                setLoading(false);
                return setAvatarError("Please select an avatar");
            }

            const { displayName, email, password } = fields;

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("res", userCredential);

            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: displayName,
                });

                await uploadImage(userCredential);

                navigate("/login");
                return user;
            } else {
                throw new Error("User cannot be created");
            }
        } catch (error: unknown) {
            console.error(error);
        }
    };

    const uploadImage = async (userCredential: any) => {
        const { displayName, email, profilePics } = fields;
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName.split(" ")[0] + date}`);

        await uploadBytesResumable(storageRef, profilePics).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    //Update profile
                    await updateProfile(userCredential.user, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    //create user on firestore
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    //create empty user chats on firestore
                    await setDoc(
                        doc(db, "userChats", userCredential.user.uid),
                        {}
                    );
                    navigate("/");
                } catch (err) {
                    console.log(err);
                    setErr(true);
                    setLoading(false);
                }
            });
        });
        // const storage = firebase.storage();
        // const storageRef = storage.ref();
        // const fileRef = storageRef.child(`files/${file.name}`);
        // const profilePictureBlob = new Blob([file], {
        //     type: file.type,
        // });
        // const uploadTask = fileRef.put(file);
        // uploadTask.on(
        //     firebase.storage.TaskEvent.STATE_CHANGED,
        //     (snapshot) => {
        //         const progress =
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log(`Upload is ${progress}% done`);
        //         switch (snapshot.state) {
        //             case firebase.storage.TaskState.PAUSED:
        //                 console.log("Upload is paused");
        //                 break;
        //             case firebase.storage.TaskState.RUNNING:
        //                 console.log("Upload is running");
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         console.log(error);
        //     },
        //     () => {
        //         fileRef.getDownloadURL().then((url) => {
        //             console.log(`File available at: ${url}`);
        //         });
        //     }
        // );
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
                            {!loading ? (
                                "Sign up"
                            ) : (
                                <AiOutlineLoading3Quarters />
                            )}
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
