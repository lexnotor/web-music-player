import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { set_embed } from '../../redux';

const Album = ({ id }) => {

    const data = useSelector(state => state.albums).find(album => album.id === id)
    const dispatch = useDispatch();
    const { images, name } = data;

    return (
        <div className='album-container' onClick={() => dispatch(set_embed({id:id, type:'album'}))}>
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