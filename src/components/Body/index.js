import React, { useEffect } from 'react'
import { refleshToken } from '../../redux'
import Header from '../Header'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'

const Body = () => {
    
    const dispatch = useDispatch();
    const getToken = useSelector(state => state.tokens)
    const getArtiste = useSelector(state => state.artistes)
    
    useEffect( ()=> {
        console.log(getToken);
    }, [getToken]);

    const search = async () => {
        if(getToken.expire_at < Date.now()) {
            await new Promise( resolved => {
                dispatch(refleshToken);
                setTimeout(()=> resolved('ok'), 2000)
            });
        }
    }

    return (
        <div className='body-container'>
            <Header />
            {getToken.access_token}<br/>
            <button
                onClick={() => search() }
            > Get token</button>
            <button
                onClick={() => console.log(getArtiste)}
            > Search</button>
            
        </div>
    )
}

export default Body