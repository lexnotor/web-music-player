import React from 'react'
import { useSelector } from 'react-redux'
import Artiste from '../Artiste'
import Header from '../Header'
import './style.css'

const Body = () => {
    
    const allArtistes = useSelector( state => state.artistes ).filter(art => art.images.length)

    return (
        <div className='body-container'>
            <Header />

            <div className='artistes-list'>
                {
                    allArtistes.map(art => <Artiste key={art.id} id={art.id} />)
                }
            </div>
            
        </div>
    )
}

export default Body