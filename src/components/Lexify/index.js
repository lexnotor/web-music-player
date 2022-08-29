import React, { Component } from 'react';
import Sidebar from '../Sidebar';

/**
 * Composant destin à accueil l'application au complet
 */

class Lexify extends Component {

    render() {
        return (
            <div>
                <Sidebar />
            </div>
        );
    }
}

export default Lexify;