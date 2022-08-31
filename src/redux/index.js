import { configureStore } from "@reduxjs/toolkit";
import { Buffer } from "buffer";
import * as slices from './slices';


/*Les actions_creator*/
export const { addArtiste, setArtiste, deleteArtiste } = slices.artiste_slice.actions;
export const { addTrack, setTrack, deleteTrack } = slices.track_slice.actions;
export const { addAlbum, setAlbum, deleteAlbum } = slices.album_slice.actions;
export const { addPlaylist, setPlaylist, deletePlaylist } = slices.playlist_slice.actions;
export const { setToken } = slices.token_slice.actions;

/*token middleware */
export const refleshToken = dispatch => {
    const [client_id, client_secret] = [process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET];
    const client_id_secret = Buffer.from(client_id + ':' + client_secret);
    const url = 'https://accounts.spotify.com/api/token';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${client_id_secret.toString('base64')}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }).toString()
    }
    fetch(url, options)
        .then(response => response.json())
        .then(data => dispatch(setToken(data)))
        .catch(error => console.log(error))
}

/*Search middleware */
export const search = (text, token) => {
    if (text.trim() === '') return;
    const baseURI = 'https://api.spotify.com/v1/search';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.token_type} ${token.access_token}`,
        }
    }
    const param = `?q=${encodeURI(text)}&type=artist,track,album,playlist&limit=1`;
    return (dispatcher => fetch(baseURI + param, options)
        .then(response => response.json())
        .then(data => { dispatcher(setArtiste(data.artists.items)); return data })
        .then(data => { dispatcher(setTrack(data.tracks.items)); return data })
        .then(data => { dispatcher(setAlbum(data.albums.items)); return data })
        .then(data => { dispatcher(setPlaylist(data.playlists.items)); return data })
        .then(data => { console.log(data);; return data })
    )
}

/*Notre redux_store*/
export const store = configureStore({
    reducer: {
        artistes: slices.artiste_slice.reducer,
        tracks: slices.track_slice.reducer,
        albums: slices.album_slice.reducer,
        playlist: slices.playlist_slice.reducer,
        tokens: slices.token_slice.reducer
    }
})
