import { configureStore } from "@reduxjs/toolkit";
import { Buffer } from "buffer";
import * as slices from './slices';


/*Les actions_creator*/
export const { addArtiste, setArtiste, deleteArtiste } = slices.artiste_slice.actions;
export const { addTrack, setTrack, deleteTrack } = slices.track_slice.actions;
export const { addAlbum, setAlbum, deleteAlbum } = slices.album_slice.actions;
export const { addPlaylist, setPlaylist, deletePlaylist } = slices.playlist_slice.actions;
export const { set_next_link } = slices.util_slice.actions;
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
export const search = (text, token, adding = false) => {
    if (text.trim() === '') return;
    const baseURI = 'https://api.spotify.com/v1/search';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.token_type} ${token.access_token}`,
        }
    }
    const param = `?q=${encodeURI(text)}&type=artist,track,album,playlist&limit=15`;

    if (!adding){
        return (dispatcher => fetch(baseURI + param, options)
            .then(response => response.json())
            .then(data => { dispatcher(setArtiste(data.artists.items)); return data })
            .then(data => { dispatcher(setTrack(data.tracks.items)); return data })
            .then(data => { dispatcher(setAlbum(data.albums.items)); return data })
            .then(data => { dispatcher(setPlaylist(data.playlists.items)); return data })
            .then(data => {
                dispatcher(set_next_link({
                    next_artistes: data.artists.next,
                    next_tracks: data.tracks.next,
                    next_albums: data.albums.next,
                    next_playlist: data.playlists.next
                }));
                return data
            })
            .then(data => { return data })
        );
    } else {
            return (dispatcher => fetch(text, options)
                .then(response => response.json())
                .then(data => {
                    data.artists && dispatcher(addArtiste(data.artists.items));
                    data.artists && dispatcher(set_next_link({next_artistes: data.artists.next}));
                    return data
                })
                .then(data => {
                    data.tracks && dispatcher(addTrack(data.tracks.items));
                    data.tracks && dispatcher(set_next_link({next_tracks: data.tracks.next}));
                    return data
                })
                .then(data => {
                    data.albums && dispatcher(addAlbum(data.albums.items));
                    data.albums && dispatcher(set_next_link({next_albums: data.albums.next}));
                    return data
                })
                .then(data => {
                    data.playlists && dispatcher(addPlaylist(data.playlists.items));
                    data.playlists && dispatcher(set_next_link({next_playlist: data.playlists.next}));
                    return data
                })
            );
        }
}

/*Notre redux_store*/
export const store = configureStore({
    reducer: {
        artistes: slices.artiste_slice.reducer,
        tracks: slices.track_slice.reducer,
        albums: slices.album_slice.reducer,
        playlists: slices.playlist_slice.reducer,
        tokens: slices.token_slice.reducer,
        utils: slices.util_slice.reducer
    }
})
