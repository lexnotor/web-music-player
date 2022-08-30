import React from 'react'
import { useSelector } from 'react-redux'
import Artiste from '../Artiste'
import Header from '../Header'
import Track from '../Track'
import Album from '../Album'
import './style.css'
import { Route, Routes } from 'react-router-dom'

const DisplayArtiste = () => {
    const allArtistes = useSelector(state => state.artistes).filter(art => art.images.length);
    return (
        <>
            <h1 className='titre-categorie'>Artistes</h1>
            <div className='artistes-list'>
                {
                    allArtistes.map(art => <Artiste key={art.id} id={art.id} />)
                }
            </div>
        </>
    )
}
const DisplayTracks = () => {
    const allTracks = useSelector(state => state.tracks).filter(track => track.album.images.length);
    return (
        <>
            <h1 className='titre-categorie'>Titres</h1>
            <div className='track-list'>
                {
                    allTracks.map(track => <Track key={track.id} id={track.id} />)
                }
            </div>
        </>
    )
}
const DisplayAlbum = () => {
    const allAlbums = useSelector(state => state.albums).filter(album => album.images.length);
    return (
        <>
            <h1 className='titre-categorie'>Albums</h1>
            <div className='album-list'>
                {
                    allAlbums.map(album => <Album key={album.id} id={album.id} />)
                }
            </div>
        </>
    )
}
const DisplayAll = () => {
    return (
        <>
            <DisplayAlbum />
            <DisplayTracks />
            <DisplayArtiste />
        </>
    )
}

const Body = () => {
    return (
        <div className='body-container'>

            <Header /><br />

            <Routes>
                <Route path='/albums' element={<DisplayAlbum />} />
                <Route path='/tracks' element={<DisplayTracks />} />
                <Route path='/artists' element={<DisplayArtiste />} />

                <Route path='/' element={<DisplayAll />} />
            </Routes>

        </div>
    )
}

export default Body
