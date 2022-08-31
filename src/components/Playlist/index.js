import React from 'react'
import './style.css'
import { useSelector } from 'react-redux';

const Playlist = ({ id }) => {

    const data = useSelector(state => state.playlists).find(playlist => playlist.id === id)
    const { href, images, name } = data;

    return (
        <div className='playlist-container'>
            <div className='playlist-image-container'>
                <img src={images.length ? images[0].url : ''} alt="" />
            </div>
            <div className='art-name-container'>
                {name.length > 20 ? `${name.slice(0, 19)}...` : name}
            </div>
        </div>
    )
}

export default Playlist