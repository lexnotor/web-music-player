import React from 'react'

const Artiste = (props) => {

    const { href, images, name } = props.data;

    return (
        <div className='artiste-container'>
            <img src={images[1].url} alt="" />

        </div>
    )
}

export default Artiste