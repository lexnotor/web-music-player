import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Lexify from './components/lexify';
import Connexion from './components/connexion';


function App() {

    const googleSpotifyAuth = useSelector(state => state.googleSpotifyAuth);

    return (
        <BrowserRouter>
            {
                googleSpotifyAuth.token ?
                <div>
                    <Lexify />
                </div>
                :
                <div>
                    <Connexion />
                </div>
            }
        </BrowserRouter>
    );
}

export default App;
