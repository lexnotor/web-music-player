import React from 'react'
import './style.css'

const Header = () => {
  return (
    <div className='header-container'>

        <div className='header-top-bar'>

            <div className='search-container'>
                <input
                    type="text"
                    name="search"
                    className='input-search'
                    placeholder='Type here'
                />
                <button
                    className='btn-search'
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