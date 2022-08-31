import React, { useEffect, useState } from 'react';
import './style.css'
import Body from '../Body';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { refleshToken, search } from '../../redux';

/**
 * Composant destin à accueil l'application au complet
 */

const Lexify = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.tokens);
    const [isMount, setIsMount] = useState(false)

    useEffect(() => {
        if (token.access_token.trim() === '')
            dispatch(refleshToken);
        else if (!isMount) {
            setTimeout(() => dispatch(search('a', token)) && setIsMount(true), 3000);

        }

    }, [dispatch, token, isMount]);

    return (
        <>
        {
            isMount ?
            <div className='lexify-container'>
                <Sidebar />
                <Body />
            </div>
        :
            <div className='lexify-loader'></div>
        }
        </>
    );
}

export default Lexify;