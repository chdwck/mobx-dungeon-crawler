import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import UniverseStore from './UniverseStore';
import Grid from './Grid';

ReactDOM.render(<Grid />, document.getElementById('root'));
registerServiceWorker();
