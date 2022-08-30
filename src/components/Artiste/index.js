import React from 'react'
import './style.css'
import { useSelector } from 'react-redux';

const Artiste = ({id}) => {

    const data = useSelector(state => state.artistes).find(art => art.id === id)

    const { href, images, name } = data;
    
    return (
        <div className='artiste-container'>
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