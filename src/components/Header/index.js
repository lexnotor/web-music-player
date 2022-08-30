import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refleshToken, setAlbum, setArtiste, setTrack } from '../../redux';
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

    const search = () => {
        if(searchText.trim() === '') return;
        const baseURI = 'https://api.spotify.com/v1/search';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token.token_type} ${token.access_token}`,
            }
        }
        const param = `?q=${encodeURI(searchText)}&type=artist,track,album&limit=2`;
        dispatch(dispatcher => fetch(baseURI + param, options)
                .then(response => response.json())
                .then(data => {dispatcher(setArtiste(data.artists.items)); return data})
                .then(data => {dispatcher(setTrack(data.tracks.items)); return data})
                .then(data => {dispatcher(setAlbum(data.albums.items)); return data})
        )
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
                        onClick={() => search()}
                    >Search</button>
                </div>
                <div className='account-container'>
                    <button className='btn-connexion'>Se connecter</button>
                </div>

            </div>
            <div className='hearder-categories'>
                <div className='categorie-item active'>
                    <span>All</span>
                </div>
                <div className='categorie-item'>
                    <span>Albums</span>
                </div>
                <div className='categorie-item'>
                    <span>Titres</span>
                </div>
                <div className='categorie-item'>
                    <span>Artistes</span>
                </div>
                <div className='categorie-item'>
                    <span>Playlists</span>
                </div>
            </div>
        </div>
    )
}

export default Header