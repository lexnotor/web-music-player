import React from "react";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

class Firebase {
    constructor() {
        this.Authapp = initializeApp(firebaseConfig);
        this.auth = getAuth(this.Authapp);
        this.provider = new GoogleAuthProvider();
    }
    signout = () => {
        this.auth.signOut();
    }

    signin = () => {
        this.provider.setCustomParameters({
            prompt: 'consent'
        });
        signInWithRedirect(this.auth, this.provider)
    }

    continuAs = (email) => {
        this.provider.setCustomParameters({
            login_hint: email
        });
        signInWithRedirect(this.auth, this.provider)
    }
}


export const GoogleAuthContext = React.createContext();
export default Firebase;