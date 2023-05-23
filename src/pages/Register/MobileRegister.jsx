import React, { useState, useContext } from 'react';
import Add from "../../shared/user/img/register/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../../processes/user/context/ThemeContext";
import SwitchButton from "../../widgets/user/changeTheme/buttonThemeSwitcher/buttonThemeSwitcher";
import "./register-styles/mobile-register-styles-white.scss";
import "./register-styles/mobile-register-styles-dark.scss";

import DarkHorse from "../../shared/logo/dark-pink-horse.png";
import WhiteHorse from "../../shared/logo/white-pink-horse.png";

const MobileRegister = () => {

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            uploadTask.on(
                (err) => {
                    setErr(true)
                },
                () => {

                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/home");
                    });
                }
            );
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className={whiteTheme ? "register-form-container-mobile-white" : "register-form-container-mobile-dark"}>

            <div className={whiteTheme ? "formWrapper-white" : "formWrapper-dark"}>
                <img className="horse" src={ whiteTheme ? WhiteHorse : DarkHorse } />
                <span className="logo">ROYALGRAM</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit} >
                    <input type="text" placeholder="diplay name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="img" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Do you have an account? <Link to="/login">Login</Link></p>
                <SwitchButton />
            </div>
        </div>
    )
};

export default MobileRegister