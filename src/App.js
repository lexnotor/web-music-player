import { Provider } from 'react-redux';
import './App.css';
import Lexify from './components/Lexify';
import { store } from './redux';

function App() {
    return (
        <Provider store={store}>
            <div>
                <Lexify />
            </div>
        </Provider>
    );
}

export default App;
