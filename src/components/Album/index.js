import React from 'react'
import './style.css'
import { useSelector } from 'react-redux';

const Album = ({ id }) => {

    const data = useSelector(state => state.albums).find(album => album.id === id)
    const { href, images, name } = data;

    return (
        <div className='album-container'>
            <div className='album-image-container'>
                <img src={images.length ? images[1].url : ''} alt="" />
            </div>
            <div className='album-name-container'>
                {name.length > 20 ? `${name.slice(0, 19)}...` : name}
            </div>
        </div>
    )
}

export default Album