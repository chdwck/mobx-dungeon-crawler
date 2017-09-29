import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MainStore from './MainStore';
import Grid from './Grid';

ReactDOM.render(<Grid store={ MainStore }/>, document.getElementById('root'));
registerServiceWorker();
