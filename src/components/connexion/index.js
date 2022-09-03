import React, { useEffect, useContext, useState } from 'react'
import './style.css'
import { GoogleAuthContext } from '../../firebase';
import * as fireAuth from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { set_user_data, delete_user_data } from '../../redux';
import googleLogo from '../../asserts/images/google.png'
import spotifyLogo from '../../asserts/images/spotify.png'

const Connexion = () => {

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const firebase = useContext(GoogleAuthContext);
    useEffect(() => {
        firebase.auth.onAuthStateChanged((rt) => {
            console.log(rt);
            if (rt?.email) {
                setUser(rt);
                const { displayName, email, refreshToken, photoURL } = rt;
                dispatch(set_user_data(
                    {
                        provider: 'Google',
                        displayName,
                        email,
                        refreshToken,
                        photoURL,
                    })
                );
            } else setUser(null)
        })
    }, [firebase, dispatch])


    useEffect(() => {

        fireAuth.getRedirectResult(firebase.auth)
            .then((result) => {
                if (!result) return;
                // Extraction du Google Token pour les APIs
                const credential = fireAuth.GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const { displayName, email, refreshToken, photoURL } = result.user;
                dispatch(set_user_data(
                    {
                        provider: 'Google',
                        displayName,
                        email,
                        refreshToken,
                        photoURL,
                        token,
                    })
                );
            }).catch(() => {
                dispatch(delete_user_data());
            });
    }, [dispatch, firebase])

    const connectPopUp = 
        <div className='connect-popup'>
            <img src={googleLogo} alt="" className='provider-logo' />
            <button
                onClick={() => firebase.signin()}
            >
                Se connecter
            </button> <br />
            {
                (user?.email) &&
                <div className='log-as'> Ou continuer en tant que <br />
                    <img src={user.photoURL} alt="" className='photo-profil'/><br />
                    <button
                        onClick={() => firebase.continuAs(user.email)}
                    >{user.email} </button>
                </div>
            }
            <img src={spotifyLogo} alt="" className='provider-logo' />
            <button
                onClick={() => firebase.signin()}
                className='btn-spotify'
            >
                Se connecter
            </button> <br />
        </div>

    return (
        <>
            {connectPopUp}
        </>
        
    )
}

export default Connexion