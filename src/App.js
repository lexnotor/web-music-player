import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Lexify from './components/Lexify';
import { store } from './redux';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Lexify />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
