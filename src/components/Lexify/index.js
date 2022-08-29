import React, { Component } from 'react';
import './style.css'
import Body from '../Body';
import Sidebar from '../Sidebar';

/**
 * Composant destin à accueil l'application au complet
 */

class Lexify extends Component {

    render() {
        return (
            <div className='lexify-container'>
                <Sidebar />
                <Body />
            </div>
        );
    }
}

export default Lexify;