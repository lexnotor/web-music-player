import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiSearch, FiMenu } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { GoogleAuthContext } from '../../firebase';
import { delete_user_data, refleshToken, search, set_searching_state, set_show_sidebar } from '../../redux';
import Connexion from '../connexion';
import './style.css'

const Header = () => {

    const [searchText, setSearchText] = useState('');
    const [select, setSelect] = useState('All');

    const [token] = useSelector(state => [state.tokens]);
    const dispatch = useDispatch();

    const catRef = useRef();

    const location = useLocation();

    const firebase = useContext(GoogleAuthContext);

    const changeText =  (e) => {
        setSearchText(e.target.value);
        if (token.expire_at < Date.now()) {
            dispatch(refleshToken);
        }  
    }

    const dispatchSearch = () => {
        if(searchText.trim() ==='') return;
        dispatch(set_searching_state('pending'));
        dispatch(search(searchText, token))
    }

    useEffect( ()=> {
        const path = /(\w+)/.exec(location.pathname);
        setSelect(path ? path[0].toUpperCase() : 'ALL');
        catRef.current.classList.toggle('show-cat', false);
    }, [location]);
    
    return (
        <div className='header-container'>
            <div className='bar-humburger' onClick={() => dispatch(set_show_sidebar(true))}>
                <FiMenu />
            </div>
            <div className='header-top-bar'>
                <div className='search-container'>
                    <input
                        type="text"
                        name="search"
                        className='input-search'
                        placeholder='Type here'
                        value={searchText}
                        onChange={changeText}
                    />
                    <button
                        className='btn-search'
                        onClick={dispatchSearch}
                    ><FiSearch /> </button>
                </div>
                <div className='account-container'>
                    <button 
                        className='btn-connexion'
                        onClick={() => dispatch(delete_user_data()) && firebase.signout()}
                    > <Connexion btn /> </button>
                </div>

            </div>
            <div className='header-categories_selector' onClick={() => catRef.current.classList.toggle('show-cat', true)}>
                <span>{select}</span>
                <span> <FiChevronDown /> </span>
            </div>
            <div ref={catRef} className='hearder-categories show-cat'>
                <NavLink to='/search/' className='categorie-item'>
                    <span>All</span>
                </NavLink>
                <NavLink to='/search/albums' className='categorie-item'>
                    <span>Albums</span>
                </NavLink>
                <NavLink to='/search/tracks' className='categorie-item'>
                    <span>Titres</span>
                </NavLink>
                <NavLink to='/search/artists' className='categorie-item'>
                    <span>Artistes</span>
                </NavLink>
                <NavLink to='/search/playlists' className='categorie-item'>
                    <span>Playlists</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Header