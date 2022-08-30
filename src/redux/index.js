import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Buffer } from "buffer";

/* Les slices*/
const artiste_slice = createSlice({
    name: 'artistes',
    initialState: [{
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR"
        },
        "followers": {
            "href": null,
            "total": 82827464
        },
        "genres": [
            "dance pop",
            "pop"
        ],
        "href": "https://api.spotify.com/v1/artists/66CXWjxzNUsdJxJ2JdwvnR",
        "id": "66CXWjxzNUsdJxJ2JdwvnR",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174cdce7620dc940db079bf4952",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178cdce7620dc940db079bf4952",
                "width": 160
            }
        ],
        "name": "Ariana Grande",
        "popularity": 87,
        "type": "artist",
        "uri": "spotify:artist:66CXWjxzNUsdJxJ2JdwvnR"
    }],
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

/*Notre redux_store*/
export const store = configureStore({
    reducer: {
        artistes: artiste_slice.reducer,
        tokens: token_slice.reducer
    }
})
