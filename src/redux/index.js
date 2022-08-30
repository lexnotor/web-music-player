import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";
import { album_template } from "../components/Album/constante";
import { artiste_templates } from "../components/Artiste/constante";
import { track_template } from "../components/Track/constante";

/* Les slices*/
const artiste_slice = createSlice({
    name: 'artistes',
    initialState: [artiste_templates],
    reducers: {
        addArtiste: (state, action) => {
            const isFind = state.find( (artiste)=> artiste.id === action.payload.id);
            if(!isFind) state.push(action.payload)
        },
        setArtiste: (state, action) => {
            state.splice(0, state.length, ...action.payload)
        },
        deleteArtiste: (state, action)=> {
            const index = state.findIndex((artiste) => artiste.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        }
    }
})

const track_slice = createSlice({
    name: 'tracks',
    initialState: [track_template],
    reducers: {
        addTrack: (state, action) => {
            const isFind = state.find((track) => track.id === action.payload.id);
            if (!isFind) state.push(action.payload)
        },
        setTrack: (state, action) => {
            state.splice(0, state.length, ...action.payload)
        },
        deleteTrack: (state, action) => {
            const index = state.findIndex((track) => track.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        }
    }
})
const album_slice = createSlice({
    name: 'album',
    initialState: [album_template],
    reducers: {
        addAlbum: (state, action) => {
            const isFind = state.find((album) => album.id === action.payload.id);
            if (!isFind) state.push(action.payload)
        },
        setAlbum: (state, action) => {
            state.splice(0, state.length, ...action.payload)
        },
        deleteAlbum: (state, action) => {
            const index = state.findIndex((album) => album.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        }
    }
})

const token_slice = createSlice({
    name: 'tokens',
    initialState: {
        access_token: "",
        token_type: "Bearer",
        expire_at: 0
    },
    reducers: {
        setToken: (state, action) => {
            state.access_token = action.payload.access_token;
            state.token_type = action.payload.token_type;
            state.expire_at = Date.now() + (action.payload.expires_in * 1000);
        }
    }
})

/*Les actions_creator*/
export const { addArtiste, setArtiste, deleteArtiste } = artiste_slice.actions;
export const { addTrack, setTrack, deleteTrack } = track_slice.actions;
export const { addAlbum, setAlbum, deleteAlbum } = album_slice.actions;
export const { setToken } = token_slice.actions;

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
    const param = `?q=${encodeURI(text)}&type=artist,track,album&limit=5`;
    return (dispatcher => fetch(baseURI + param, options)
        .then(response => response.json())
        .then(data => { dispatcher(setArtiste(data.artists.items)); return data })
        .then(data => { dispatcher(setTrack(data.tracks.items)); return data })
        .then(data => { dispatcher(setAlbum(data.albums.items)); return data })
    )
}

/*Notre redux_store*/
export const store = configureStore({
    reducer: {
        artistes: artiste_slice.reducer,
        tracks: track_slice.reducer,
        albums: album_slice.reducer,
        tokens: token_slice.reducer
    }
})
