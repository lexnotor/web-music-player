import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { refleshToken, search} from '../../redux';
import './style.css'

const Header = () => {

    const [searchText, setSearchText] = useState('');
    const token = useSelector(state => state.tokens);
    const dispatch = useDispatch();

    const changeText =  (e) => {
        setSearchText(e.target.value);
        if (token.expire_at < Date.now()) {
            dispatch(refleshToken);
        }
            
    }

    return (
        <div className='header-container'>

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
                        onClick={() => dispatch(search(searchText, token))}
                    >Search</button>
                </div>
                <div className='account-container'>
                    <button className='btn-connexion'>Se connecter</button>
                </div>

            </div>
            <div className='hearder-categories'>
                <NavLink to='/' className='categorie-item' >
                    <span>All</span>
                </NavLink>
                <NavLink to='/albums' className='categorie-item'>
                    <span>Albums</span>
                </NavLink>
                <NavLink to='/tracks' className='categorie-item'>
                    <span>Titres</span>
                </NavLink>
                <NavLink to='/artists' className='categorie-item'>
                    <span>Artistes</span>
                </NavLink>
                <NavLink to='/' className='categorie-item'>
                    <span>Playlists</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Header