import React, { useContext } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleAuthContext } from '../../firebase';
import { delete_user_data, set_show_sidebar } from '../../redux'
import './style.css';

const Sidebar = () => {

    const [showSide] = useSelector(state =>  [state.utils.show_sidebar]);
    const dispatch = useDispatch()
    const firebase = useContext(GoogleAuthContext)

    return (
        <div className={showSide ?'sidebar-container show-side' : 'sidebar-container'}>
            <div className='sidebar-close'>
                <FiArrowLeft onClick={() => dispatch(set_show_sidebar(false))} />
            </div>
            <div>
                <span>Accueil</span>
            </div>
            <div>
                <span>Playlists</span>
            </div>
            <div>
                <span>Music lické</span>
            </div>
            <div className='account-container'>
                <button 
                    className='btn-connexion'
                    onClick={() => dispatch(delete_user_data()) && firebase.signout() }
                >Deconnexion</button>
            </div>
        </div>
    )
}
// allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
export default Sidebar