import React, { useEffect, useContext, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import './style.css'
import { GoogleAuthContext } from '../../firebase';
import * as fireAuth from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { set_user_data, delete_user_data } from '../../redux';
import googleLogo from '../../asserts/images/google.png'
import spotifyLogo from '../../asserts/images/spotify.png'



const ConnectPopUp = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const firebase = useContext(GoogleAuthContext);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true)
        // Ce useEffect est destiné uniquement au modal de la connex
        // Si l'utilisateur ne s'est pas deconnecté precedement, on stocke ses données
        firebase.auth.onAuthStateChanged((credential) => {
            setLoader(false);
            if (credential && credential.email) {
                setUser(credential);
                console.log(credential);
                dispatch(set_user_data(
                    {
                        provider: 'Google',
                        displayName: credential.displayName,
                        email: credential.email,
                        refreshToken: credential.accessToken,
                        photoURL: credential.photoURL,
                        token: credential.accessToken,
                    })
                );
                // accessToken displayName email photoURL 
            }
            else setUser(null);
        });
        // getRedirectResult() permet de recevoir les données lors d'une connexion
        fireAuth.getRedirectResult(firebase.auth)
            .then((result) => {
                // result vaut null si l'utilisateur ne s'est pas connecté
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
                // Si une erreur se produit on efface les données de l'utilisateur dans redux
                dispatch(delete_user_data());
            });
    }, [dispatch, firebase])

    // On definit le modal de connexion, 
    const connectPopUp =
        <div className='connect-popup'>
            <img src={googleLogo} alt="" className='provider-logo' />
            <button
                onClick={() => firebase.signin()}
            >Se connecter
            </button>

            {
                (user?.email) &&
                <div className='log-as'> Ou continuer en tant que <br />
                    <img src={user.photoURL} alt="" className='photo-profil' /><br />
                    <button
                        onClick={() => firebase.continuAs(user.email)}
                    >{user.email} </button>
                </div>
            }

            
            <div
                onClick={() => firebase.signout()}
                className='api-spotify'
            > Spotify APIs 
            </div>
            <img src={spotifyLogo} alt="" className='provider-logo' />
        </div>
    
    return ( 
        <>
            {
                loader ?
                    <div className='connect-popup'>
                        <div className='connect-loading'></div>
                    </div>
                    : connectPopUp
            }
        </>
        
    )

}

const ButtonData = () => {
    const { displayName } = useSelector(state => state.googleSpotifyAuth);

    const buttonData =
        <div className='btn-data'>
            {displayName.length > 10 ? displayName.slice(0, 9)+'... ' : displayName}
            <FiLogOut />
        </div>
    return ( buttonData )
}

// Ce composant peut être soit un Modal de connexion, soit un bouton indiquant l'utilisateur connecté
const Connexion = (props) => {

    return (
        <>
            { 
                props.btn ?
                <ButtonData />
                : <ConnectPopUp />
            }
        </>
    )
}

export default Connexion