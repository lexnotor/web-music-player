import React from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { set_embed } from '../../redux';

const Track = ({ id }) => {
    const data = useSelector(state => state.tracks).find(track => track.id === id);
    const dispatch = useDispatch();

    const { album, name } = data;

    const { images } = album;

    const to_embed = {
        id: album.id ? album.id : id,
        type: album.id ? 'album' : 'track'
    }
    console.log(album.id, to_embed)
    return (
        <div className='track-container' onClick={() => dispatch(set_embed(to_embed))}>
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