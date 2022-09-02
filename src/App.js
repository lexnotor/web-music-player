import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Lexify from './components/lexify';
import { Authapp } from './firebase';
import { set_user_data, delete_user_data } from './redux';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult} from "firebase/auth";
import { useEffect } from 'react';


function App() {
    const dispatch = useDispatch();
    const googleAuth = useSelector(state => state.googleAuth);
    useEffect(() => {
        const auth = getAuth(Authapp);
        auth.onAuthStateChanged((rt) => {
            console.log(rt)
        })
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const { displayName, email, refreshToken, photoURL } = result.user;
                dispatch(set_user_data({ displayName, email, refreshToken, photoURL, token }));
                console.log(result.user.accessToken);
            }).catch((error) => {
                dispatch(delete_user_data());
                console.log(error)
            });
    }, [dispatch])

    const signin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(Authapp);
        signInWithRedirect(auth, provider)
    }

    return (
        <BrowserRouter>
            {
                googleAuth.token ?
                <div>
                    <Lexify />
                </div>
                :
                <button 
                    onClick={() => signin()}
                > Se connecter</button>
            }
        </BrowserRouter>
    );
}

export default App;
