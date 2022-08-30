import React from 'react';
import './style.css'
import { useSelector } from 'react-redux';

const Track = ({ id }) => {
    const data = useSelector(state => state.tracks).find(track => track.id === id)

    const { href, album, name } = data;

    const { images } = album;

    return (
        <div className='track-container'>
            <div className='track-image-container'>
                <img src={images.length ? images[1].url : ''} alt="" />
            </div>

            <div className='track-name-container'>
                {name.length > 20 ? `${name.slice(0, 19)}...` : name}
            </div>
        </div>
    )
}

export default Track