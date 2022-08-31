import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Artiste from '../Artiste'
import Header from '../Header'
import Track from '../Track'
import Album from '../Album'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import { search } from '../../redux'

const DisplayArtiste = () => {
    const allArtistes = useSelector(state => state.artistes).filter(art => art.images.length);
    const [transX,setTransX] = useState(0);
    return (
        <>
            <h1 className='titre-categorie'>Artistes</h1>
            <div className="caroussel">
                <button className='left-arrow' onClick={() => setTransX(transX >= 0 ? transX : transX + 100)}>P</button>
                <button className='rigth-arrow' onClick={() => setTransX(transX => transX - 100)}>N</button>
                <div className='artistes-list' style={{ width: 240 * allArtistes.length + 'px', transform: `translate(${transX}px)` }}>
                    {
                        allArtistes.map(art => <Artiste key={art.id} id={art.id} />)
                    }
                    
                </div>
            </div>
        </>
    )
}
const DisplayTracks = () => {
    const allTracks = useSelector(state => state.tracks).filter(track => track.album.images.length);
    const [transX, setTransX] = useState(0);
    return (
        <>
            <h1 className='titre-categorie'>Titres</h1>
            <div className="caroussel">
                <button className='left-arrow' onClick={() => setTransX(transX >= 0 ? transX : transX + 100)}>P</button>
                <button className='rigth-arrow' onClick={() => setTransX(transX => transX - 100)}>N</button>
                <div className='track-list' style={{ width: 240 * allTracks.length + 'px', transform: `translate(${transX}px)` }}>
                    {
                        allTracks.map(track => <Track key={track.id} id={track.id} />)
                    }
                </div>
            </div>
        </>
    )
}
const DisplayAlbum = () => {
    const allAlbums = useSelector(state => state.albums).filter(album => album.images.length);
    const [transX, setTransX] = useState(0);
    return (
        <>
            <h1 className='titre-categorie'>Albums</h1>
            <div className='caroussel'>
                <button className='left-arrow' onClick={() => setTransX(transX>=0 ?transX:transX + 100)}>P</button>
                <button className='rigth-arrow' onClick={() => setTransX(transX-100)}>N</button>
                <div className='album-list' style={{ width: 240 * allAlbums.length + 'px', transform: `translate(${transX}px)` }}>
                    {
                        allAlbums.map(album => <Album key={album.id} id={album.id} />)
                    }
                </div>
            </div>

        </>
    )
}
const DisplayPlaylist = () => {
    const allPlaylists = useSelector(state => state.playlists).filter(playlist => playlist.images.length);
    const [transX, setTransX] = useState(0);
    return (
        <>
            <h1 className='titre-categorie'>Playlists</h1>
            <div className='caroussel'>
                <button className='left-arrow' onClick={() => setTransX(transX>=0 ?transX:transX + 100)}>P</button>
                <button className='rigth-arrow' onClick={() => setTransX(transX-100)}>N</button>
                <div className='playlist-list' style={{ width: 240 * allPlaylists.length + 'px', transform: `translate(${transX}px)` }}>
                    {
                        allPlaylists.map(album => <playlist key={album.id} id={album.id} />)
                    }
                </div>
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
            {/* <DisplayPlaylist /> */}
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
                {/* <Route path='/playlists' element={<DisplayPlaylist />} /> */}

                <Route path='/' element={<DisplayAll />} />
            </Routes>

        </div>
    )
}

export default Body
