import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import './style.css'
import Body from '../Body';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { refleshToken, search, set_embed } from '../../redux';

/**
 * Composant destin à accueil l'application au complet
 */

const Lexify = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.tokens);
    const [isMount, setIsMount] = useState(false);
    const to_embed = useSelector(state => state.utils.embed);
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

                        {
                            to_embed[0] ?
                                <div className='pc-music-pop-up'>
                                    <span onClick={() => dispatch(set_embed(''))}><FaWindowClose /></span> 
                                    <iframe
                                        title='music'
                                        style={{ bordeRadius: "12px" }}
                                        src={`https://open.spotify.com/embed/${to_embed[1]}/${to_embed[2]}?utm_source=generator`}
                                        width="100%"
                                        height="300"
                                        frameBorder="0"
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </div>
                                :
                                <></>
                        }

                    </div>
                    :
                    <div className='lexify-loader'></div>
            }
        </>
    );
}

export default Lexify;