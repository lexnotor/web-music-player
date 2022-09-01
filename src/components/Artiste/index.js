import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { set_embed } from '../../redux';

const Artiste = ({id}) => {

    const data = useSelector(state => state.artistes).find(art => art.id === id);
    const dispatch = useDispatch();
    const { images, name } = data;
    
    return (
        <div className='artiste-container' onClick={() => dispatch(set_embed({id:id, type:'artist'}))}>
            <div className='art-image-container'>
                <img src={images.length ? images[1].url : ''} alt="" />
            </div>
            <div className='art-name-container'>
                {name.length > 20 ? `${name.slice(0, 19)}...` : name}
            </div>
        </div>
    )
}

export default Artiste