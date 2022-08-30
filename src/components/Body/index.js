import React from 'react'
import { useSelector } from 'react-redux'
import Artiste from '../Artiste'
import Header from '../Header'
import Track from '../Track'
import Album from '../Album'
import './style.css'

const Body = () => {

    const allArtistes = useSelector(state => state.artistes).filter(art => art.images.length);
    const allTracks = useSelector(state => state.tracks).filter(track => track.album.images.length);
    const allAlbums = useSelector(state => state.albums).filter(album => album.images.length);

    return (
        <div className='body-container'>
            <Header /><br />
            <>
                <h1 className='titre-categorie'>Artistes</h1>
                <div className='artistes-list'>
                    {
                        allArtistes.map(art => <Artiste key={art.id} id={art.id} />)
                    }
                </div>
            </>

            <>
                <h1 className='titre-categorie'>Titres</h1>
                <div className='track-list'>
                    {
                        allTracks.map(track => <Track key={track.id} id={track.id} />)
                    }
                </div>
            </>

            <>
                <h1 className='titre-categorie'>Titres</h1>
                <div className='album-list'>
                    {
                        allAlbums.map(album => <Album key={album.id} id={album.id} />)
                    }
                </div>
            </>

        </div>
    )
}

export default Body