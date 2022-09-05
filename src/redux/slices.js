import { createSlice } from "@reduxjs/toolkit";
import { album_template } from "../components/album/constante";
import { artiste_templates } from "../components/artiste/constante";
import { playlist_template } from "../components/playlist/constante";
import { track_template } from "../components/track/constante";


/* Les slices*/
export const artiste_slice = createSlice({
    name: 'artistes',
    initialState: [artiste_templates],
    reducers: {
        addArtiste: (state, action) => {
            action.payload.forEach((elm) => {
                (!state.find((art) => art.id === elm.id)) && state.push(elm)
            })
        },
        setArtiste: (state, action) => {
            state.splice(0, state.length, ...action.payload)
        },
        deleteArtiste: (state, action) => {
            const index = state.findIndex((artiste) => artiste.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        }
    }
})

export const track_slice = createSlice({
    name: 'tracks',
    initialState: [track_template],
    reducers: {
        addTrack: (state, action) => {
            action.payload.forEach((elm) => {
                (!state.find((track) => track.id === elm.id)) && state.push(elm)
            })
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

export const album_slice = createSlice({
    name: 'album',
    initialState: [album_template],
    reducers: {
        addAlbum: (state, action) => {
            action.payload.forEach( (elm) => {
                (!state.find((album) => album.id === elm.id)) && state.push(elm)
            })
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

export const playlist_slice = createSlice({
    name: 'playlists',
    initialState: [playlist_template],
    reducers: {
        addPlaylist: (state, action) => {
            action.payload.forEach((elm) => {
                (!state.find((playlist) => playlist.id === elm.id)) && state.push(elm)
            })
        },
        setPlaylist: (state, action) => {
            state.splice(0, state.length, ...action.payload)
        },
        deletePlaylist: (state, action) => {
            const index = state.findIndex((playlist) => playlist.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        }
    }
})

export const token_slice = createSlice({
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

export const google_spotify_slice = createSlice({
    name: 'googleSpotifyAuth',
    initialState: {
        provider: '',
        displayName: '',
        email: '',
        refreshToken: '',
        photoURL: '',
        token: ''
    },
    reducers: {
        set_user_data: (state, action) => {
            return {...state, ...action.payload }
        },
        delete_user_data: (state) => {
            for(const key in state) state[key] = '';
        }
    }
})

export const util_slice = createSlice({
    name: 'utils',
    initialState: {
        next_artistes: '',
        next_tracks: '',
        next_albums: '',
        next_playlist: '',
        embed: [false, ''],
        show_sidebar: false,
        searching_state: 'finish'
    },
    reducers: {
        set_next_link: (state, action) => {
            state = {...state, ...action.payload};
            return state;
        },
        set_embed: (state, action) => {
            if(action.payload.length === 0)
                state.embed = [false, '', ''];
            else {
                state.embed = [true, action.payload.type, action.payload.id];
            } 
        },
        set_show_sidebar: (state, action) => {
            state.show_sidebar = action.payload;
        },
        set_searching_state: (state, action) => {
            state.searching_state = action.payload;
        }
    }
})