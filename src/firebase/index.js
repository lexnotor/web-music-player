import React from "react";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, inMemoryPersistence, signInWithRedirect } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB6w1ns59C2mKUFWRtM-FNDfwUD0S4Lb9E",
    authDomain: "web-music-player-361216.firebaseapp.com",
    projectId: "web-music-player-361216",
    storageBucket: "web-music-player-361216.appspot.com",
    messagingSenderId: "1000120687412",
    appId: "1:1000120687412:web:bb0369d4c19b5bf0b4a361"
};

class Firebase {
    constructor() {
        this.Authapp = initializeApp(firebaseConfig);
        this.auth = getAuth(this.Authapp);
        this.auth.setPersistence(inMemoryPersistence);
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