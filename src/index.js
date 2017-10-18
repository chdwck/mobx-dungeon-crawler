import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MainStore from './MainStore';
import App from './components/App';

ReactDOM.render(<App store={ MainStore }/>, document.getElementById('root'));
registerServiceWorker();
